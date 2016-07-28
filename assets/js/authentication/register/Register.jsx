require('bootstrap-loader');
require("css/globals/base.scss")

import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import RegistrationForm from 'js/authentication/register/RegistrationForm';
import getCookie from 'js/globals/GetCookie'

class Register extends Component {
    render() {
        return (
            <Row>
                <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">Register</h1>
                    <RegistrationForm />
                </Col>
            </Row>
        )
    }
}

module.exports = Register;