import React, { useState } from "react";
import * as yup from 'yup';
import axios from 'axios';
import baseUrl from '../../../api';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import perfil from '../../../assets/user.png';
import './Modal.scss'
import '../../../assets/custom.css';
import { history } from '../../../history';


const Modal = ({ handleClose, show, data, role, children }) => {

    const [name] = useState(data.name);
    const [cpf] = useState(data.cpf);
    const [email] = useState(data.email);
    const [roleAccess] = useState(role? data['role_access']: false);
    const [error, setError] = useState(false);

    const { password, newPassword } = useState();

    var img = (data.img) ? data.img['img_path'] : perfil;



    const handleSubmit = async (values) => {
        console.log(values)
        await axios.patch(`${baseUrl}/users/edit/${data['_id']}`, values)
            .then(() => {
                history.go();
            })
            .catch((err) => {
                console.log("Deu erro");
                setError(true);
            });
        //     .then(async resp => {
        //         console.log(resp)
        //         const data = resp;
        //         if (data) {
        //             if (dataImg) {
        //                 let id = data.data.user['_id'];
        //                 await axios.patch(`${baseUrl}/users/image/${id}`, dataImg)
        //                     .then(async res => {
        //                         await console.log(res)
        //                     });
        //             }
        //             sessionStorage.setItem('app-token', data.data['jwtToken']);
        //             sessionStorage.setItem('user_id', data.data.user['_id']);
        //             sessionStorage.setItem('role_access', data.data.user['role_access']);
        //             history.push('/');
        //         }
        //     })
        //     .catch((err) => {
        //     });
    }

    const validations = yup.object().shape({
        name: yup.string().min(2).required(),
        email: yup.string().min(5).required(),
        password: yup.string().min(5).notRequired(),
        newPassword: yup.string().min(5).notRequired(),
        cpf: yup.string().min(11).required(),
    });


    const handleChange = (e) => {
        const files = e.currentTarget.files[0];
        const reader = new FileReader();
        const imgTag = document.getElementById("myimage");
        imgTag.title = files.name;
        reader.onload = function (event) {
            imgTag.src = event.target.result;
        };
        reader.readAsDataURL(files);

        let file = e.target.files[0];

        img = new FormData();
        img.append('file', file);

    };

    const initialValues = {
        name,
        cpf,
        email,
        roleAccess
    };

    return (
        <div className={show ? "modal display-block fadeIn" : "modal display-none"}>
            <section className="modal-main">

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validations}
                >
                    <Form className="Form fadeIn first">

                        <div className="">
                            <img src={img} alt="" id="myimage" />
                        </div>
                        <div className="">

                            <label htmlFor="button-img" className="user-img">Selecionar uma foto</label>
                            <input type='file' onChange={(o) => handleChange(o)} encType="multipart/form-data" />

                        </div>
                        {children}
                        <label className="col-lg-12">Nome: </label>
                        <Field
                            type="text"
                            name="name"
                            className="Form-Field field "
                            placeholder="Nome completo"
                        />
                        <p>
                            <ErrorMessage
                                component="span"
                                name="name"
                                className="Form-Error "
                            />

                        </p>
                        <label className="col-lg-12">Senha: </label>

                        <Field
                            type="password"
                            name="password"
                            value={password}
                            className="Form-Field field "
                            placeholder="Senha atual"
                        />

                        <p>
                            <ErrorMessage
                                component="span"
                                name="password"
                                className="Form-Error "
                            />
                        </p>

                        <label className="col-lg-12">Nova senha: </label>
                        <Field
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            className="Form-Field field "
                            placeholder="Nova senha"
                        />

                        <p>
                            <ErrorMessage
                                component="span"
                                name="newPassword"
                                className="Form-Error "
                            />
                        </p>
                        <label className="col-lg-12">E-mail:</label>
                        <Field
                            type="email"
                            name="email"
                            className="Form-Field field "
                            placeholder="E-mail"
                        />
                        <p>
                            <ErrorMessage
                                component="span"
                                name="email"
                                className="Form-Error "
                            />

                        </p>
                        <label className="col-lg-12">CPF:</label>
                        <Field
                            type="text"
                            name="cpf"
                            className="Form-Field field "
                            placeholder="CPF"
                        />
                        <p>
                            <ErrorMessage
                                component="span"
                                name="cpf"
                                className="Form-Error "
                            />
                        </p>
                        {
                            (role) ? (
                                <div>
                                    <label className="col-lg-12">Acesso:</label>
                                    <Field
                                        type="text"
                                        name="roleAccess"
                                        className="Form-Field field "
                                        placeholder="Acesso"
                                    />
                                    <p>
                                        <ErrorMessage
                                            component="span"
                                            name="cpf"
                                            className="Form-Error "
                                        />
                                    </p>
                                </div>
                            ) : ''
                        }


                        <button
                            type="submit"
                            className="Form-Btn "
                            value="submit"
                        >
                            Atualizar
                    </button>
                    </Form>
                </Formik>
                <button
                    className="btn-cancel "
                    onClick={handleClose}>close
                </button>
            </section>
        </div>
    );
};

export default Modal;
