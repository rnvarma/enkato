import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Alert from 'react-bootstrap/lib/Alert';

import auth from 'auth';
import request from 'js/globals/HttpRequest';
import GoogleAuth from 'js/globals/GoogleAuth';

class RegistrationForm extends Component {
    static propTypes = {
        callbackFn: PropTypes.func.isRequired,
        closeRegisterModal: PropTypes.func.isRequired,
        embed: PropTypes.bool,
    }

    state = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password1: '',
        password2: '',
        errorField: '',
        errorMsg: '',
    }

    componentDidMount = () => {
        const script = document.createElement('script');
        script.setAttribute('src', 'https://apis.google.com/js/platform.js');
        $('head').append(script);
    }

    onFirstNameChange = (e) => {
        this.setState({ firstname: e.target.value });
    }

    onLastNameChange = (e) => {
        this.setState({ lastname: e.target.value });
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onUserNameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    onPassword1Change = (e) => {
        this.setState({ password1: e.target.value });
    }

    onPassword2Change = (e) => {
        this.setState({ password2: e.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const postData = this.state;
        if (postData.password1 !== postData.password2) {
            this.setState({
                errorField: 'password',
                errorMsg: 'The passwords did not match.',
            });
            return;
        }
        request.post('/registeruser', {
            data: postData,
            success: (data) => {
                if (data.status) {
                    auth.login(postData.username, postData.password1, (success) => {
                        if (success) {
                            if (this.props.callbackFn) {
                                this.props.callbackFn();
                                this.props.closeRegisterModal();
                            }
                            else if (this.props.navBarItem) {
                                this.props.closeSignUpModal();
                            } else {
                                window.location.href = '/';
                            }
                        } else {
                            browserHistory.push('/login');
                        }
                    }, this.props.embed);
                } else {
                    this.setState({
                        errorField: data.field,
                        errorMsg: data.text,
                    });
                }
            },
        }, this.props.embed);
    }

    render() {
        let disabled = (!this.state.firstname
                        || !this.state.lastname
                        || !this.state.email
                        || !this.state.username
                        || !this.state.password1
                        || !this.state.password2);
        let errorMsg;
        if (this.state.errorMsg) {
            errorMsg = (
                <Alert bsStyle="danger">
                    {this.state.errorMsg}
                </Alert>
            );
        }
        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                {errorMsg}
                <FormGroup
                    controlId="first-name"
                    validationState={(this.state.errorField === 'firstname') ? 'error' : (this.state.firstname ? 'success' : 'warning')}
                >
                    <Col componentClass={ControlLabel} sm={3}>
                        First Name
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onFirstNameChange}
                                type="text"
                                placeholder="First Name"
                            />
                            <InputGroup.Addon>
                                <FontAwesome name="pencil" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="last-name"
                    validationState={(this.state.errorField === 'lastname') ? 'error' : (this.state.lastname ? 'success' : 'warning')}
                >
                    <Col componentClass={ControlLabel} sm={3}>
                        Last Name
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onLastNameChange}
                                type="text"
                                placeholder="Last Name"
                            />
                            <InputGroup.Addon>
                                <FontAwesome name="pencil" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="user-name"
                    validationState={(this.state.errorField === 'username') ? 'error' : (this.state.username ? 'success' : 'warning')}
                >
                    <Col componentClass={ControlLabel} sm={3}>
                        Username
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onUserNameChange}
                                type="text"
                                placeholder="User Name"
                            />
                            <InputGroup.Addon>
                                <FontAwesome name="user" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="email"
                    validationState={(this.state.errorField === 'email') ? 'error' : (this.state.email ? 'success' : 'warning')}
                >
                    <Col componentClass={ControlLabel} sm={3}>
                        Email
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onEmailChange}
                                type="email"
                                placeholder="Email"
                            />
                            <InputGroup.Addon>
                                <FontAwesome name="envelope" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="password"
                    validationState={(this.state.errorField === 'password') ? 'error' : (this.state.password1 ? 'success' : 'warning')}
                >
                    <Col componentClass={ControlLabel} sm={3}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onPassword1Change}
                                type="password"
                                placeholder="Password"
                            />
                            <InputGroup.Addon>
                                <FontAwesome name="lock" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="password"
                    validationState={(this.state.errorField === 'password') ? 'error' : (this.state.password2 ? 'success' : 'warning')}
                >
                    <Col componentClass={ControlLabel} sm={3}>
                        Re-enter Password
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl
                                onChange={this.onPassword2Change}
                                type="password"
                                placeholder="Re-enter Password"
                            />
                            <InputGroup.Addon>
                                <FontAwesome name="lock" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={9} smOffset={3}>
                        <Button
                            className="structabl-red"
                            type="submit"
                            disabled={disabled}
                        >
                            Register
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={9} smOffset={3}>
                        <GoogleAuth />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default RegistrationForm;
