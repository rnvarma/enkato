import React, { Component } from 'react'

import FontAwesome from 'react-fontawesome'

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';

class EditSeriesForm extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onFormSubmit(this.state);
    }

    componentWillMount() {
        this.props.initForm();
    }

    render() {
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="user-name">
                    <Col componentClass={ControlLabel} sm={3}>
                        Name
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.props.onNameChange} type="text" defaultValue = {this.props.name} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={3}>
                        Description
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.props.onDescriptionChange} componentClass="textarea" type="text" defaultValue = {this.props.description} />
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default EditSeriesForm;