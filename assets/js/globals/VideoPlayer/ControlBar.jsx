require('bootstrap-loader');
require("css/globals/VideoPlayer/ControlBar")
var React = require('react');
var ReactDOM = require('react-dom');
var FontAwesome = require('react-fontawesome');
var Row = require('react-bootstrap').Row;
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