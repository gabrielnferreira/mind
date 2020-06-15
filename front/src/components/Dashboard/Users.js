import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../api';
import './Profile.scss';
import perfil from '../../assets/user.png';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import '../../assets/custom.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUsers, faAddressCard, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import Modal from './Modal/Modal'


const Users = () => {

    const [data, setData] = useState({ users: [] });
    const [modal, setModal] = useState(false);


    // useEffect(() => {
    //     axios.get(`${baseUrl}/users/${sessionStorage.getItem('user_id')}`)
    //         .then(resp => {
    //             user = resp;
    //             console.log(user)
    //         });
    //     axios.get(`${baseUrl}/users/`)
    //         .then(async resp => {
    //             console.log(resp);
    //         });
    // });

    useEffect(() => {
        if (!!(sessionStorage.getItem('role_access') === '1')) {
            history.push('/')
        }
        else if (!!(sessionStorage.getItem('role_access') === '0')) { history.push('/login') }
        axios.get(`${baseUrl}/users/`)
            .then(async resp => {
                setData(resp.data);
            });
    }, []);


    const showModal = () => {
        setModal(true);
    }

    const hideModal = () => {
        setModal(false);
    }


    return (
        <div>
            <div className="container-profile">
                <div id="content" className="fadeIn">
                    <div className="navBar">
                        <img src={logo} alt="mind" className="col-lg-2"></img>
                        <span className="col-lg-8">
                            <span>
                                <Link to="/">
                                    <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                    <span> Perfil </span>
                                </Link>
                            </span>
                            <span>
                                <Link to="/users" className="a-active">
                                    <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                                    <span> Usuários </span>
                                </Link>
                            </span>
                        </span>
                        <span className="col-lg-2">
                            <Link to="/login">
                                <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>

                                <span> Sair</span>
                            </Link>
                        </span>
                    </div>
                    <header id="header-content">
                    </header>
                    <div className="users-container">
                        <ul>
                            <li id="first-li" key="states">
                                <span className="number col-lg-1"></span>
                                <span className="name col-lg-3">Nome</span>
                                <span className="cpf col-lg-2">CPF</span>
                                <span className="email col-lg-3">E-mail</span>
                                <span className="role col-lg-1">Acesso</span>
                                <span className="role col-lg-2">Editar</span>
                            </li>
                            {data.users.map((item, index) => (
                                <li key={index}>
                                    <span className="number col-lg-1">
                                        <img
                                            src={!!(item.img) ? item.img['img_path'] : perfil}
                                            alt="mind" className="image-users"></img>
                                    </span>
                                    <span className="name col-lg-3">{item.name}</span>
                                    <span className="cpf col-lg-2">{item.cpf}</span>
                                    <span className="email col-lg-3">{item.email}</span>
                                    <span className="email col-lg-1">
                                        {
                                            (item['role_access'] === '1') ? 'Usuário' :
                                                ((item['role_access'] === '999') ? 'Admin' : 'Desativado')
                                        }
                                    </span>

                                    {/* MODAL */}
                                    <Modal show={modal} data={item} handleClose={hideModal}>
                                        {index}
                                    </Modal>
                                    <span className="edit col-lg-1">
                                        <button className="users-button" type="button" onClick={showModal}>
                                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                        </button>
                                    </span>
                                    <span className="delete col-lg-1">
                                        <button className="users-button">
                                            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                        </button>
                                    </span>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;
