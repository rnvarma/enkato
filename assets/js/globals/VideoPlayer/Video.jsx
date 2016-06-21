require('bootstrap-loader');
require("css/globals/VideoPlayer/Video")


var React = require('react')
var ReactDOM = require('react-dom')

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;



module.exports = React.createClass({
    componentDidMount:function(){
        this.props.initializePlayer();
    },
    render:function(){
        return this.props.renderVideo();
    }
});