require('bootstrap-loader');
require("css/globals/VideoPlayer/ControlBar")

import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

import { Row, Popover, OverlayTrigger, Button } from 'react-bootstrap';

import ProgressBar from 'js/globals/videoPlayer/ProgressBar';

module.exports = React.createClass({
    showPlaybackSpeedChanger: function(){
        this.setState({isShowingSpeedChanger:true})
    },
    hidePlaybackSpeedChanger: function(){
        this.setState({isShowingSpeedChanger:false})
    },
    getInitialState: function(){
        return {
            playBackSpeed:'1x',
            isShowingSpeedChanger:false
        }
    },
    setPlaybackSpeed: function(speed){
        this.hidePlaybackSpeedChanger()
        this.setState({
            playBackSpeed:speed+'x'
        })
        this.props.setPlaybackRate(speed, this.props.playerContext)
    },
    componentDidMount: function() {
        this.setState({
            isShowingSpeedChanger:false
        })
    },
    render: function() {
        var playOrPause;
        if(this.props.isPlaying){
            playOrPause = "pause"
        }else{
            playOrPause="play"
        }

        let popoverArea = "";
        if (this.state.isShowingSpeedChanger) {
            popoverArea =
                (<Popover placement="top" className="playbackPopover">
                    <div 
                        onClick={this.setPlaybackSpeed.bind(this,2)}
                        className="speedButton">
                        2x
                    </div>
                    <div 
                        onClick={this.setPlaybackSpeed.bind(this,1.5)}
                        className="speedButton">
                        1.5x
                    </div>
                    <div 
                        onClick={this.setPlaybackSpeed.bind(this,1)}
                        className="speedButton">
                        1x
                    </div>
                    <div 
                        onClick={this.setPlaybackSpeed.bind(this,.5)}
                        className="speedButton">
                        .5x
                    </div>
                    <div 
                        onClick={this.setPlaybackSpeed.bind(this,.25)}
                        className="speedButton">
                        .25x
                    </div>
                </Popover>);
        }

        return (
            <div className="controlBar">
                <ProgressBar 
                    handleScrub={this.props.handleScrub}
                    videoDuration={this.props.videoDuration}
                    handleTopicClick={this.props.handleTopicClick}
                    topicObjList={this.props.topicObjList}
                    percentDone={this.props.percentDone}
                />
                <Row>
                    <FontAwesome 
                        className="playButton" 
                        name={playOrPause}
                        onClick={this.props.handlePlayPauseClick}
                    />
                    <span className="videoTime">{this.props.currentTime} / {this.props.totalTime}</span>
                    {popoverArea}
                    <span 
                        className="playbackRate"
                        onClick={this.showPlaybackSpeedChanger}>
                        {this.state.playBackSpeed}
                    </span>
                </Row>
            </div>
        );
    }
});
