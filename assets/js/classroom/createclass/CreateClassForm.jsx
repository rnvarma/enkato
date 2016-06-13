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
            name: '',
            description: '',
        }
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value})
    },
    onSubmit: function(e) {
        e.preventDefault();
        if (!this.state.name || !this.state.description) {
            return false;
        }
        this.props.onFormSubmit(this.state);
    },
    render: function() {
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="name">
                    <Col componentClass={ControlLabel} sm={2}>
                        Classroom Name
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl onChange={this.onNameChange} type="text" placeholder="Classroom Name" />
                            <InputGroup.Addon>
                                <FontAwesome name='pencil' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup controlId="description">
                    <Col componentClass={ControlLabel} sm={2}>
                        Description
                    </Col>
                    <Col sm={10}>
                        <FormControl componentClass="textarea" onChange={this.onDescriptionChange} type="text" placeholder="Describe what your class is about" />
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