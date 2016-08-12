import React, { Component, PropTypes } from 'react'

import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import getCookie from 'js/globals/GetCookie'

import auth from 'auth';
import request from 'js/globals/HttpRequest';

class SignUpModal extends Component {
    render() {
            return (
                    <Modal 
                        show={this.props.signUpModalOpen} 
                        onHide={this.props.closeSignUpModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <RegistrationForm
                          navBarItem= {this.props.navBarItem}
                          closeSignUpModal={this.props.closeSignUpModal}/>
                      </Modal.Body>
                    </Modal>
            )
    }
}

export default SignUpModal;