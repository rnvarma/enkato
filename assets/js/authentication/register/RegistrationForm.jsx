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
import Alert from 'react-bootstrap/lib/Alert';

class RegistrationForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password1: '',
            password2: '',
        }

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPassword1Change = this.onPassword1Change.bind(this);
        this.onPassword2Change = this.onPassword2Change.bind(this);
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

    onPassword1Change(e) {
        this.setState({password1: e.target.value})
    }

    onPassword2Change(e) {
        this.setState({password2: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
    }

    render() {
        var disabled = (!this.state.firstname
                        || !this.state.lastname
                        || !this.state.email
                        || !this.state.username
                        || !this.state.password1
                        || !this.state.password2)
        var errorMsg;
        if (this.props.errorMsg) {
            errorMsg = (
                <Alert bsStyle="danger">
                    {this.props.errorMsg}
                </Alert>
            )
        }
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                {errorMsg}
                <FormGroup
                    controlId="first-name"
                    validationState={(this.props.errorField == "firstname") ? "error" : (this.state.firstname ? "success" :"warning")}>
                    <Col componentClass={ControlLabel} sm={3}>
                        First Name
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onFirstNameChange}
                                type="text"
                                placeholder="First Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='pencil' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="last-name"
                    validationState={(this.props.errorField == "lastname") ? "error" : (this.state.lastname ? "success" :"warning")}>
                    <Col componentClass={ControlLabel} sm={3}>
                        Last Name
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onLastNameChange}
                                type="text"
                                placeholder="Last Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='pencil' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="user-name"
                    validationState={(this.props.errorField == "username") ? "error" : (this.state.username ? "success" :"warning")}>
                    <Col componentClass={ControlLabel} sm={3}>
                        User Name
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onUserNameChange}
                                type="text"
                                placeholder="User Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='user' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="email"
                    validationState={(this.props.errorField == "email") ? "error" : (this.state.email ? "success" :"warning")}>
                    <Col componentClass={ControlLabel} sm={3}>
                        Email
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onEmailChange}
                                type="email"
                                placeholder="Email" />
                            <InputGroup.Addon>
                                <FontAwesome name='envelope' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="password"
                    validationState={(this.props.errorField == "password") ? "error" : (this.state.password1 ? "success" :"warning")}>
                    <Col componentClass={ControlLabel} sm={3}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onPassword1Change}
                                type="password"
                                placeholder="Password" />
                            <InputGroup.Addon>
                                <FontAwesome name='lock' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="password"
                    validationState={(this.props.errorField == "password") ? "error" : (this.state.password2 ? "success" :"warning")}>
                    <Col componentClass={ControlLabel} sm={3}>
                        Re-enter Password
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onPassword2Change}
                                type="password"
                                placeholder="Re-enter Password" />
                            <InputGroup.Addon>
                                <FontAwesome name='lock' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={10} smOffset={2}>
                        <Button
                            className="structabl-red"
                            type="submit"
                            disabled={disabled}>
                            Submit
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default RegistrationForm;