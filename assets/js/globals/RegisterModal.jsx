
import React, { PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import LoginForm from 'js/authentication/login/LoginForm';

import auth from 'auth';
import request from 'js/globals/HttpRequest';

class RegisterModal extends Component {
    render() {
        
        if(!auth.loggedIn()){
            return (
                <li className="createSeriesModal">
                    <Modal 
                        show={this.props.registerModalOpen} 
                        onHide={this.props.closeRegisterModal}>
                      <Modal.Header closeButton>

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
                        <LoginForm
                            callbackFn={callbackFn}
                            closeRegisterModal={closeRegisterModal}
                            embed={embed}
                        />
                        <RegistrationForm
                            callbackFn={callbackFn}
                            closeRegisterModal={closeRegisterModal}
                            embed={embed}
                        />
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
}

export default RegisterModal;
