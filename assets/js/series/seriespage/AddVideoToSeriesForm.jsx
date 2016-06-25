
require("css/series/seriespage/AddVideoToSeriesForm.scss");

var React = require('react')

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;

module.exports = React.createClass({
    render: function() {
        return (
            <div className="addVideoToSeriesForm">
                <Form>
                    <ControlLabel>Enter one or more URLs to the youtube videos you would like to add to the series.</ControlLabel>
                    <FormControl className="addVideoTextArea" rows={10} onChange={this.props.onURLAdded} componentClass="textarea" type="text" placeholder="Enter each URL on a new line." />
                </Form>
            </div>
        )
    }
})
