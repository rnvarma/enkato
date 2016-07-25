require('bootstrap-loader');
require("css/globals/base.scss")

import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import getCookie from 'js/globals/GetCookie'

import auth from 'auth';
import request from 'js/globals/HttpRequest';

class Register extends Component {
    constructor(props) {
        super(props)

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(postData) {
        request.post('/registeruser', {
            data: postData,
            success: function(data) {
                if (data.status) {
                    auth.login(postData.username, postData.password, function(success) {
                        if (success) {
                            window.location.href = '/'
                        } else {
                            browserHistory.push('/login')
                        }
                    }.bind(this))
                } else {
                    alert(data.issue)
                }
            }.bind(this)
        })
    }

    render() {
        return (
            <Row>
                <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">Register</h1>
                    <RegistrationForm onFormSubmit={this.onFormSubmit} />
                </Col>
            </Row>
        )
    }
}

module.exports = Register;