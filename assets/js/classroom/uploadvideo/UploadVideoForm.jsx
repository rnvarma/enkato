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
            file_url: ''
        }
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    onFileChange: function(e) {
        this.setState({file_url: e.target.value})
        console.log(e.target.value);
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
    },
    render: function() {
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="name">
                    <Col componentClass={ControlLabel} sm={2}>
                        Video Name
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
                        Video File
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.onFileChange} type="file" placeholder="Upload the video file" />
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