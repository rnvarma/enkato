require('bootstrap-loader');
require("css/globals/VideoPlayer/ControlBar")


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

var ProgressBar = require('js/globals/videoPlayer/ProgressBar')

module.exports = React.createClass({
    render:function(){
        if(this.props.isPlaying){
            return(
                <div className="controlBar">
                    <ProgressBar 
                        handleScrub={this.props.handleScrub}
                        getDuration={this.props.getDuration}
                        topicObjList={this.props.topicObjList}
                        percentDone={this.props.percentDone}
                    />
                    <Row>
                        <FontAwesome 
                            className="playButton" 
                            name="pause" 
                            onClick={this.props.handlePlayPauseClick}
                        /> 
                        <span className="videoTime">{this.props.currentTime}</span>
                    </Row>
                </div>
            )
        } else {
            return(
                <div className="controlBar">
                    <ProgressBar 
                        handleScrub={this.props.handleScrub}
                        getDuration={this.props.getDuration}
                        topicObjList={this.props.topicObjList}
                        percentDone={this.props.percentDone}
                    />
                    <Row>
                        <FontAwesome 
                            className="playButton" 
                            name="play" 
                            onClick={this.props.handlePlayPauseClick}
                        /> 
                        <span className="videoTime">{this.props.currentTime}</span>
                    </Row>
                </div>
            )
        }
    }
});