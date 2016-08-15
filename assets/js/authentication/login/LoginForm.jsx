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
console.log("yooo");

export default class LoginForm extends Component {
    static propTypes = {
        callbackFn: PropTypes.func.isRequired,
        closeRegisterModal: PropTypes.func.isRequired,
        embed: PropTypes.bool,
        closeLoginModal: PropTypes.func.isRequired,
        navBarItem: PropTypes.bool,
    }

    state = {
        username: '',
        password: '',
        errorMsg: '',
        errorField: '',
    }

    componentDidMount = () => {
        const script = document.createElement('script');
        script.setAttribute('src',  "https://apis.google.com/js/platform.js");
        $('head').append(script);
    }

    onSuccess = (googleUser) => {
        console.log('Signed in as: ' + googleUser.getBasicProfile().getName());
        profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    }

    onUserNameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        auth.login(this.state.username, this.state.password, (success) => {
            if (success) {
                if (this.props.callbackFn) {
                    this.props.callbackFn();
                    this.props.closeRegisterModal();
                }
                else if (this.props.navBarItem) {
                    this.props.closeLoginModal();
                } else {
                    window.location.href = '/';
                }
            }
        }, (error) => {
            this.setState({
                errorMsg: error,
            });
        }, this.props.embed);
    }

    render() {
        const disabled = !this.state.username || !this.state.password;

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
                <script>{this.onSuccess}</script>
                <FormGroup controlId="user-name">
                    <Col componentClass={ControlLabel} sm={3}>
                        Username
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl onChange={this.onUserNameChange} type="text" placeholder="User Name" />
                            <InputGroup.Addon>
                                <FontAwesome name={'user'} />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={3}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl onChange={this.onPasswordChange} type="password" placeholder="Password" />
                            <InputGroup.Addon>
                                <FontAwesome name={'lock'} />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={9} smOffset={3}>
                        <Button className="structabl-red" type="submit" disabled={disabled}>
                            Login
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm = {9} smOffset = {3}>
                        <div className="g-signin2" data-onsuccess={this.onSuccess}></div>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
