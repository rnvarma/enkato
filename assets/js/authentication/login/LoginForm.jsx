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

import auth from 'auth';

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            errorMsg: '',
            errorField: '',
        }

        this.onUserNameChange = this.onUserNameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onUserNameChange(e) {
        this.setState({username: e.target.value})
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value})
    }

    onFormSubmit(e) {
        e.preventDefault();
        auth.login(this.state.username, this.state.password, (success) => {
            if (success) {
                if (this.props.callbackFn) {
                    this.props.callbackFn()
                    this.props.closeRegisterModal()
                } else {
                    window.location.href = "/"
                }
            }
        }, (errorMsg) => {
            this.setState({
                errorMsg: errorMsg
            })
        })
    }

    render() {
        var disabled = (!this.state.username
                        || !this.state.password)
        var errorMsg;
        if (this.state.errorMsg) {
            errorMsg = (
                <Alert bsStyle="danger">
                    {this.state.errorMsg}
                </Alert>
            )
        }
        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                {errorMsg}
                <FormGroup
                    controlId="user-name">
                    <Col componentClass={ControlLabel} sm={3}>
                        User Name
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <FormControl onChange={this.onUserNameChange} type="text" placeholder="User Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='user' />
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
                                <FontAwesome name='lock' />
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
            </Form>
        )
    }
}

export default LoginForm;