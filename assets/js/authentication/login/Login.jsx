import React, { Component } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import LoginForm from 'js/authentication/login/LoginForm';

class Login extends Component {
    render() {
        return (
            <Row>
                <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">Login</h1>
                    <LoginForm />
                </Col>
            </Row>
        );
    }
}

module.exports = Login;
