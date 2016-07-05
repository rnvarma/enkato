require("css/authentication/register/RegistrationForm.scss")

var React = require('react')
var FontAwesome = require('react-fontawesome');
 
var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            user_name: '',
            password: ''
        }
    },
    onFirstNameChange: function(e) {
        this.setState({first_name: e.target.value})
    },
    onLastNameChange: function(e) {
        this.setState({last_name: e.target.value})
    },
    onEmailChange: function(e) {
        this.setState({email: e.target.value})
    },
    onUserNameChange: function(e) {
        this.setState({user_name: e.target.value})
    },
    onPasswordChange: function(e) {
        this.setState({password: e.target.value})
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
    },
    render: function() {
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
})