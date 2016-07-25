
import React, { Component, PropTypes } from 'react'

import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import getCookie from 'js/globals/GetCookie'

import auth from 'auth';
import request from 'js/globals/HttpRequest';

class RegisterModal extends Component {
    constructor(props) {
        super(props)

        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onFormSubmit(postData) {
        request.post('/registeruser', {
            data: postData,
            success: function(data) {
                if (data.status) {
                    auth.login(postData.username, postData.password, function(success) {
                        if (success) {
                            this.props.setLoggedIn(true)
                            this.props.callbackFn()
                        } else {
                            browserHistory.push('/login')
                        }
                        this.props.closeRegisterModal()
                    }.bind(this))
                } else {
                    alert(data.issue)
                }
            }.bind(this)
        })
    }
        
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
                        <RegistrationForm onFormSubmit={this.onFormSubmit} />
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
                        <Modal.Title>You are forbidden from seeing this</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        ah
                      </Modal.Body>
                    </Modal>
                </li>
            )
    }
}

export default RegisterModal;