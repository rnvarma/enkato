require("css/authentication/register/RegistrationForm.scss")

import React, { Component } from 'react'

import FontAwesome from 'react-fontawesome'
 
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';

class RegistrationForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        }

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFirstNameChange(e) {
        this.setState({firstname: e.target.value})
    }

    onLastNameChange(e) {
        this.setState({lastname: e.target.value})
    }

    onEmailChange(e) {
        this.setState({email: e.target.value})
    }

    onUserNameChange(e) {
        this.setState({username: e.target.value})
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
    }

    render() {
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="first-name">
                    <Col componentClass={ControlLabel} sm={2}>
                        First Name
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl onChange={this.onFirstNameChange} type="text" placeholder="First Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='pencil' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup controlId="last-name">
                    <Col componentClass={ControlLabel} sm={2}>
                        Last Name
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl onChange={this.onLastNameChange} type="text" placeholder="Last Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='pencil' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup controlId="user-name">
                    <Col componentClass={ControlLabel} sm={2}>
                        User Name
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl onChange={this.onUserNameChange} type="text" placeholder="User Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='user' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup controlId="email">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl onChange={this.onEmailChange} type="text" placeholder="Email" />
                            <InputGroup.Addon>
                                <FontAwesome name='envelope' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl onChange={this.onPasswordChange} type="password" placeholder="Password" />
                            <InputGroup.Addon>
                                <FontAwesome name='lock' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={10} smOffset={2}>
                        <Button type="submit">
                            Submit
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default RegistrationForm;