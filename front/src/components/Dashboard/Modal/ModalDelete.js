import React, { useState } from "react";
import './Modal.scss';
import axios from 'axios';
import baseUrl from '../../../api';
import { history } from '../../../history';


const ModalDelete = ({ handleClose, show, data, children }) => {
    const [name] = useState(data.name);

    const handleDelete = () => {
        axios.delete(`${baseUrl}/users/delete/${data['_id']}`)
            .then(() => {
                history.go();
            })
            .catch((err) => {
            });
    }

    return (
        <div className={show ? "modal display-block fadeIn" : "modal display-none"}>
            <section className="modal-delete-main">
                <div>
                    <label>
                        Você tem certeza que deseja excluir {name}?
                    </label>
                </div>

                <div>
                    <button
                        type="submit"
                        className="Form-Btn"
                        value="submit"
                        onClick={handleDelete}
                    >
                        Deletar
                    </button>

                    <button
                        className="btn-cancel "
                        onClick={handleClose}>
                        Cancelar
                </button>
                </div>
            </section>
        </div>
    );
};

export default ModalDelete;