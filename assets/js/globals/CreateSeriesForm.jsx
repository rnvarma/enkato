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
    getInitialState: function () {
        return {
            name: '',
            description: '',
            categories: []
        }
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    onDescriptionChange: function (e) {
        this.setState({description: e.target.value})
    },
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
                        <FormControl onChange={this.onNameChange} type="text" placeholder="Enter a series name." />
                    </Col>
                </FormGroup>
                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={3}>
                        Description
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.onDescriptionChange} componentClass="textarea" type="text" placeholder="Enter your description." />
                    </Col>
                </FormGroup>
                <Button onClick={this.close}>Close</Button>
            </Form>
        )
    }
})