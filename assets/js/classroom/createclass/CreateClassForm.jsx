require("css/authentication/register/RegistrationForm.scss")

var React = require('react')

var FontAwesome = require('react-fontawesome');

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';

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