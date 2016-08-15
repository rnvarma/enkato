
import React, { Component, PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import LoginForm from 'js/authentication/login/LoginForm';
import getCookie from 'js/globals/GetCookie';

import auth from 'auth';
import request from 'js/globals/HttpRequest';

class LoginModal extends Component {

    constructor(props) {
        super(props);

        console.log("loginModal called");
        console.log(this.props);
    }

    render() {
        return (
            <Modal
                show={this.props.loginModalOpen}
                onHide={this.props.closeLoginModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm
                        navBarItem={this.props.navBarItem}
                        closeLoginModal={this.props.closeLoginModal}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoginModal;
