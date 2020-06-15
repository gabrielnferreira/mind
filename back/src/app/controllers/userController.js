const express = require('express');
const routes = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerConfig = require("../config/multer");
const path = require('path');
const authConfig = require('../config/auth');
const serverPort = require('../config/serverPort');

/**
 * Get para todos os documentos da base de dados
 */
routes.get('/', async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).send({ users })
    } catch {
        response.status(400).send({ "error": "Query failed" });
    }
});

/**
 * Get por ID do usuário
 */
routes.get('/:id', async (request, response) => {
    try {
        const users = await User.findById(request.params.id);
        response.json(users);
    } catch {
        response.status(400).send({ "error": "User not found" });
    }
});


/**
 * Cadastrar novo usuário
 */
routes.post('/add', async (request, response) => {
    try {
        if (await User.findOne({ email: request.body.email }))
            return response.status(400).send({ "error": "User already exists" });
        if (request.file) request.body.img = {
            name: request.file.originalname,
            size: request.file.size,
            key: request.file.filename,
            img_path: `http://localhost:${serverPort}/users/uploads/${request.file.filename}`
        }
        request.body.role_access = 1

        const hash = await bcrypt.hash(request.body.password, 10);
        request.body.password = hash;

        const user = await User.create(request.body);

        user.password = undefined;

        response.status(200).send({
            user,
            jwtToken: generateToken({ id: user._id }),
        });
    } catch (error) {
        return response.status(400).send({ "error": "Somenthing went wrong" });
    }
});

/**
 * Insere a imagem no usuário posteriormente
 */
routes.patch('/image/:id', multer(multerConfig).single("file"), async (request, response) => {

    try {
        await User.findById(request.params.id, (req, res) => {
            let user = res;
            if (request.file) {
                user.img = {
                    name: request.file.originalname,
                    size: request.file.size,
                    key: request.file.filename,
                    img_path: `http://localhost:${serverPort}/users/uploads/${request.file.filename}`
                }

                try {
                    console.log(user);
                    user.save((err, prod) => {
                        if (err) {
                            console.log(err)
                            response.status(500).send(err);

                        }
                        else {
                            response.status(200).json(prod);
                        }
                    });
                } catch (error) {
                    response.status(400).send({ "error": "User not found" });

                }
            }
        });

    } catch {
        response.status(400).send({ "error": "User not found" });
    }
});



//{"img.name" :{$exists: true}} retorna usuários que contenham imagem
routes.use('/uploads', express.static(path.resolve('src', 'app', 'tmp', 'uploads')));


/**
 * Editar usuário
 */
routes.patch('/edit/:id', async (request, response) => {
    const { name, cpf, email, password, newPassword, roleAccess } = request.body;
    console.warn(request.body);

    try {
        await User.findById(request.params.id, async (err, prod) => {
            if (err)
                response.status(500).send(err);
            else if (!prod)
                response.status(404).send({ "error": "User not found" });
            else {
                console.log(prod);
                if (name) prod.name = name;
                if (cpf) prod.cpf = cpf;
                if (email) prod.email = email;
                console.log(password)
                if (password && newPassword) {
                    if (!(await bcrypt.compare(password, prod.password))) {
                        console.log("Senha tá errada")
                        return response.status(400).json({ "Error": "Wrong password" });
                    }
                    else {
                        console.log("Senha tá certa")
                        const hash = await bcrypt.hash(newPassword, 10);
                        prod.password = hash;
                    }
                }
                if (roleAccess) prod['role_access'] = roleAccess;
                try {
                    console.warn(prod);
                    await prod.save((err, prod) => {
                        if (err)
                            response.status(500).send(err);
                        else
                            response.status(200).json(prod);
                    });
                } catch (error) {
                    response.status(500).send(error);
                }
            }
        }).select('+password');
    } catch (error) {
        response.status(500).send(error);
    }


});

/**
 * Deleta um usuário
 */
routes.delete('/delete/:id', async (request, response) => {
    await User.deleteOne({ _id: request.params.id },
        (err) => {
            if (err)
                response.status(500).send(err);
            else
                response.status(200).send({ "200": "User deleted" });
        });
});


/**
 * Função para gerar os tokens da autenticação
 * @param {} params Parâmetros que serão utilizados pelo jwt
 */
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 604800, //tempo para expirar o token
    });
}

routes.post('/autenticate', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user)
        return response.status(400).json({ "Error": "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
        return response.status(400).send({ "Error": "Wrong password" });

    user.password = undefined;


    response.status(200).send({
        user,
        jwtToken: generateToken({ id: user._id }),
    });
});


module.exports = routes;