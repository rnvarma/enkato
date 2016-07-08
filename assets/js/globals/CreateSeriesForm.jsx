var React = require('react')

var FontAwesome = require('react-fontawesome');

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';

module.exports = React.createClass({
    onSubmit: function (e) {
        e.preventDefault()
        this.props.onFormSubmit(this.state);
    },
    render: function() {
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="user-name">
                    <Col componentClass={ControlLabel} sm={3}>
                        Name
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.props.onNameChange} type="text" placeholder="Enter a series name." />
                    </Col>
                </FormGroup>
                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={3}>
                        Description
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.props.onDescriptionChange} componentClass="textarea" type="text" placeholder="Enter your description." />
                    </Col>
                </FormGroup>
            </Form>
        )
    }
})