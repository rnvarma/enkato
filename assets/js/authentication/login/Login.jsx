require('bootstrap-loader');
require("css/globals/base.scss")

import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import getCookie from 'js/globals/GetCookie'
import LoginForm from 'js/authentication/login/LoginForm'

import auth from 'auth';

class Login extends Component {
    constructor(props) {
        super(props)
        
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onFormSubmit(data) {
        auth.login(data.username, data.password, (success) => {
            if (success) {
                window.location.href = "/"
            } else {
                alert("failed!")
            }
        })
    }

    render() {
        return (
            <Row>
                <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">Login</h1>
                    <LoginForm onFormSubmit={this.onFormSubmit} />
                </Col>
            </Row>
        )
    }
}

module.exports = Login;