import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../api';
import './Profile.scss';
import perfil from '../../assets/user.png';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import '../../assets/custom.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faAddressCard, faUsers, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal/Modal'


const Profile = () => {

    const [img, setImg] = useState();
    const [role] = useState(sessionStorage.getItem('role_access'));
    const [data, setData] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}/users/${sessionStorage.getItem('user_id')}`)
            .then(resp => {
                if (resp.data.img) setImg(resp.data.img['img_path']);
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
                        {/* <div className="col-lg-3"></div> */}
                        <span className="col-lg-8">
                            <span>
                                <Link to="/" className="a-active">
                                    <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                                    <span> Perfil </span>
                                </Link>
                            </span>

                            {!!(role === '999') ? (
                                <span>
                                    <Link to="/users">
                                        <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                                        <span> Usuários </span>
                                    </Link>
                                </span>)
                                : ''}
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
                    <div id="image-content">
                        <img
                            src={!!(img) ? img : perfil}
                            alt="mind" id="image-profile"></img>
                    </div>
                    {
                        (data) ? (
                            <div>

                                <div id="profile-content">
                                    <span className="name col-lg-12">
                                        <label>
                                            {data.name}
                                        </label>
                                    </span>
                                    <span className="name col-lg-12">
                                        <label>
                                            E-mail:
                                    </label>
                                        <label>
                                            {data.email}
                                        </label>
                                    </span>
                                    <span className="name col-lg-12">
                                        <label>
                                            CPF:
                                    </label>
                                        <label>
                                            {data.cpf}
                                        </label>
                                    </span>
                                    <span className="name col-lg-12">
                                        <label>
                                            Nível de acesso:
                            </label>
                                        <label>
                                            {
                                                (data['role_access'] === '1') ? 'Usuário' :
                                                    ((data['role_access'] === '999') ? 'Admin' : 'Desativado')
                                            }
                                        </label>
                                    </span>

                                </div>

                                <div id="edit-content">


                                    {/* MODAL */}
                                    <Modal show={modal} data={data} handleClose={hideModal} role={false}>

                                    </Modal>
                                    <button id="edit-button" type="button" onClick={showModal}>
                                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;
