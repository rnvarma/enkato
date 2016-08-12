
import React, { Component, PropTypes } from 'react'

import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import LoginForm from 'js/authentication/login/LoginForm';
import getCookie from 'js/globals/GetCookie'

import auth from 'auth';
import request from 'js/globals/HttpRequest';

class RegisterModal extends Component {
    render() {
        /*var googleScript = (
            <script>
                function onSignIn(googleUser) {
                    profile = googleUser.getBasicProfile();
                    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                    console.log('Full Name: ' + profile.getName());
                    console.log('Given Name: ' + profile.getGivenName());
                    console.log('Family Name: ' + profile.getFamilyName());
                    console.log("Image URL: " + profile.getImageUrl());
                    console.log("Email: " + profile.getEmail());

                    // The ID token you need to pass to your backend:
                    id_token = googleUser.getAuthResponse().id_token;
                    console.log("ID Token: " + id_token);
                };
             </script>
        )*/
        
        if(!auth.loggedIn()){
            return (
                <li className="createSeriesModal">
                    <Modal 
                        show={this.props.registerModalOpen} 
                        onHide={this.props.closeRegisterModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Login or Register to use this feature!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <LoginForm
                          callbackFn={this.props.callbackFn}
                          closeRegisterModal={this.props.closeRegisterModal}/>
                        <RegistrationForm
                          callbackFn={this.props.callbackFn}
                          closeRegisterModal={this.props.closeRegisterModal}/>
                        {this.props.googleSignIn}
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