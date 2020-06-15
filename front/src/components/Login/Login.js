import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss'
import image from '../../assets/image-mind.png';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import baseUrl from '../../api';
import { history } from '../../history';

const Login = () => {

    const [error, setError] = useState(false);
    const { email, pass } = useState();

    sessionStorage.removeItem('app-token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('role_access');

    const handleSubmit = values => {
        axios.post(`${baseUrl}/users/autenticate`, values)
            .then(resp => {
                const data = resp
                if (data) {
                    sessionStorage.setItem('app-token', data.data['jwtToken']);
                    sessionStorage.setItem('user_id', data.data.user['_id']);
                    sessionStorage.setItem('role_access', data.data.user['role_access']);
                    sessionStorage.setItem('user', data.data.user);
                    history.push('/');
                }
            })
            .catch((err) => {
                setError(true);
            });
    }
    const validations = yup.object().shape({
        email: yup.string().min(0).required(),
        password: yup.string().min(5).required(),

    })

    return (
        <div className="container-login">
            <div id="formContent">
                <div>
                    <header>
                        <img src={image} alt="mind" className="img fadeInDown"></img>
                    </header>
                    {/* <h3>Faça login para iniciar</h3> */}
                </div>
                <div className={!error ? "hidden" : ""}>
                    <p>
                        E-mail ou senha incorreto!
                    </p>
                </div>
                <Formik
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    validationSchema={validations}
                >
                    <Form className="Form">
                        <Field
                            type="text"
                            name="email"
                            value={email}
                            className="Form-Field field fadeIn second"
                            placeholder="E-mail ou CPF"
                        />
                        <p>
                            <ErrorMessage
                                component="span"
                                name="email"
                                className="Form-Error"
                            />

                        </p>

                        <Field
                            type="password"
                            name="password"
                            className="Form-Field field fadeIn second"
                            placeholder="Senha"
                            value={pass}

                        />

                        <p>
                            <ErrorMessage
                                component="span"
                                name="password"
                                className="Form-Error"
                            />
                        </p>
                        <button
                            type="submit"
                            className="Form-Btn fadeIn second"
                            value="submit">
                            Login
                        </button>
                    </Form>
                </Formik>

                <div id="formFooter" className="fadeIn third">
                    Não tem usuário? <Link to="/register">Cadastre-se</Link>
                </div>

            </div>
        </div>


    );
}

export default Login;
