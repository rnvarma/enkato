
import React, { PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import LoginForm from 'js/authentication/login/LoginForm';

import auth from 'auth';

const RegisterModal = ({ registerModalOpen, closeRegisterModal, callbackFn, embed }) => {
    if (!auth.loggedIn()) {
        return (
            <li className="createSeriesModal">
                <Modal
                    show={registerModalOpen}
                    onHide={closeRegisterModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Login or Register to use this feature!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="nav nav-tabs" id="tabContent">
                            <li className="active">
                                <a href="#register" data-toggle="tab">Register</a>
                            </li>
                            <li>
                                <a href="#log-in" data-toggle="tab">Log In</a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="register">
                                <RegistrationForm
                                    callbackFn={callbackFn}
                                    closeRegisterModal={closeRegisterModal}
                                    embed={embed}
                                />
                            </div>
                            <div className="tab-pane" id="log-in">
                                <LoginForm
                                    callbackFn={callbackFn}
                                    closeRegisterModal={closeRegisterModal}
                                    embed={embed}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </li>
        );
    }

    return (
        <li className="createSeriesModal">
            <Modal
                show={registerModalOpen}
                onHide={closeRegisterModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>You are forbidden from seeing this content.</Modal.Title>
                </Modal.Header>
                <Modal.Body />
            </Modal>
        </li>
    );
};

RegisterModal.propTypes = {
    registerModalOpen: PropTypes.bool.isRequired,
    closeRegisterModal: PropTypes.func.isRequired,
    callbackFn: PropTypes.func.isRequired,
    embed: PropTypes.bool,
};

export default RegisterModal;
