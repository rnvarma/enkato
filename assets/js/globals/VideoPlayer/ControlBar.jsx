require('bootstrap-loader');
require("css/globals/VideoPlayer/ControlBar")
var React = require('react');
var ReactDOM = require('react-dom');
var FontAwesome = require('react-fontawesome');
var Row = require('react-bootstrap').Row;
var ProgressBar = require('js/globals/videoPlayer/ProgressBar')

module.exports = React.createClass({
    render:function(){
        var playOrPause;
        if(this.props.isPlaying){
            playOrPause = "pause"
        }else{
            playOrPause="play"
        }
        return(
                <div className="controlBar">
                    <ProgressBar 
                        handleScrub={this.props.handleScrub}
                        getDuration={this.props.getDuration}
                        topicObjList={this.props.topicObjList}
                        percentDone={this.props.percentDone}/>
                    <Row>
                        <FontAwesome 
                            className="playButton" 
                            name={playOrPause}
                            onClick={this.props.handlePlayPauseClick}/> 
                        <span className="videoTime">{this.props.currentTime}</span>
                    </Row>
                </div>
            )
    }
});