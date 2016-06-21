require('bootstrap-loader');
require("css/globals/VideoPlayer/ProgressBar")


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

function updateProgressBar(percentComplete){
    $(".watched").width(percentComplete + "%");
    $(".notWatched").width((100 - percentComplete) + "%");
}


module.exports = React.createClass({
    handleScrub: function(e){
        var scrubX = e.pageX - $(".progressBar").offset().left;
        var totalX = $(".progressBar").width();
        var percentOfOne = scrubX * 1.0 / totalX;
        console.log(percentOfOne *100)

        //First, set new width of bar
        updateProgressBar(percentOfOne*100);

        //Second, send data to VideoPlayer
        this.props.handleScrub(percentOfOne)
    },
    render:function(){
        updateProgressBar(this.props.percentDone)
        return(
            <div className="progressBar" onClick={this.handleScrub}>
                <div className="watched"></div>
                <div className="notWatched"></div>
            </div>
        )
    }
});