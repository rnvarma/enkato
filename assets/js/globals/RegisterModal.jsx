
import React, { Component, PropTypes } from 'react'

import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import getCookie from 'js/globals/GetCookie'

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
                        <Modal.Title>Register to use this feature!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <RegistrationForm />
                      </Modal.Body>
                    </Modal>
                </li>
            )
        }
        return (
                <li className="createSeriesModal">
                    <Modal 
                        show={this.props.registerModalOpen} 
                        onHide={this.props.closeRegisterModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>You are forbidden from seeing this content.</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      </Modal.Body>
                    </Modal>
                </li>
            )
    }
}

export default RegisterModal;