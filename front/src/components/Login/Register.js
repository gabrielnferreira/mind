import * as React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.scss'
import image from '../../assets/logo.png';
import perfil from '../../assets/user.png';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import baseUrl from '../../api';
import { history } from '../../history';


const Register = () => {
    sessionStorage.removeItem('app-token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('role_access');

    var dataImg = undefined;

    const {name, pass, email, cpf} = useState();


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

        dataImg = new FormData();
        dataImg.append('file', file);
   
    };

    const handleSubmit = async values => {
        await axios.post(`${baseUrl}/users/add`, values)
            .then(async resp => {
                const data = resp;
                if (data) {
                    if(dataImg){
                        let id = data.data.user['_id']; 
                        await axios.patch(`${baseUrl}/users/image/${id}`, dataImg)
                            .then( async res => {
                            });
                    }
                    sessionStorage.setItem('app-token', data.data['jwtToken']);
                    sessionStorage.setItem('user_id', data.data.user['_id']);
                    sessionStorage.setItem('role_access', data.data.user['role_access']);
                    history.push('/');
                }
            })
            .catch((err) => {
            });
    }

    
    const validations = yup.object().shape({
        name: yup.string().min(2).required(),
        email: yup.string().min(5).required(),
        password: yup.string().min(5).required(),
        cpf: yup.string().min(11).required(),
    });

    return (
        <div className="container-login">
            <div id="formContent">
                <div>
                    <header>
                        <img src={image} alt="mind" className="fadeInDown"></img>
                        {/* <h4 className="text-top fadeIn first">REGISTRAR:</h4> */}
                    </header>
                </div>

                <Formik
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    validationSchema={validations}
                >
                    <Form className="Form">

                        <div className="fadeIn second">
                            <img src={perfil} alt="" id="myimage" />
                        </div>
                        <div className="fadeIn second">

                            <label htmlFor="button-img" className="user-img">Selecionar uma foto</label>
                            <input type='file' id="button-img" onChange={(o) => handleChange(o)} encType="multipart/form-data" />

                        </div>
                        <Field
                            type="text"
                            name="name"
                            value={name}
                            className="Form-Field field fadeIn second"
                            placeholder="Nome completo"
                        />
                        <p>
                            <ErrorMessage
                                component="span"
                                name="name"
                                className="Form-Error"
                            />

                        </p>

                        <Field
                            type="password"
                            name="password"
                            value={pass}
                            className="Form-Field field fadeIn second"
                            placeholder="Senha"
                        />

                        <p>
                            <ErrorMessage
                                component="span"
                                name="password"
                                className="Form-Error"
                            />
                        </p>

                        <Field
                            type="email"
                            name="email"
                            value={email}
                            className="Form-Field field fadeIn second"
                            placeholder="E-mail"
                        />
                        <p>
                            <ErrorMessage
                                component="span"
                                name="email"
                                className="Form-Error"
                            />

                        </p>

                        <Field
                            type="text"
                            name="cpf"
                            value={cpf}
                            className="Form-Field field fadeIn second"
                            placeholder="CPF"
                        />
                        <p>
                            <ErrorMessage
                                component="span"
                                name="cpf"
                                className="Form-Error"
                            />
                        </p>


                        <button
                            type="submit"
                            className="Form-Btn fadeIn second"
                            value="submit"
                        >
                            Cadastrar
                    </button>
                    </Form>
                </Formik>
                <div id="formFooter" className="fadeIn third">
                    Já é cadastrado? <Link to="/login">Efetue login</Link>
                </div>

            </div>
        </div>
    )
}



export default Register;
