require('bootstrap-loader');
require("css/globals/VideoPlayer/ControlBar")
var React = require('react');
var ReactDOM = require('react-dom');
var FontAwesome = require('react-fontawesome');
var Row = require('react-bootstrap').Row;
var Popover = require('react-bootstrap').Popover;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

var ProgressBar = require('js/globals/videoPlayer/ProgressBar')

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
    componentDidMount: function(){
        this.setState({
            isShowingSpeedChanger:false
        })
    },
    render:function(){
        var playOrPause;
        if(this.props.isPlaying){
            playOrPause = "pause"
        }else{
            playOrPause="play"
        }
        if(this.state.isShowingSpeedChanger){
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
                            />
                        <span className="videoTime">{this.props.currentTime}</span>
                        <Popover placement='top' className="playbackPopover">
                            <div 
                                onClick={this.setPlaybackSpeed.bind(this,2)}
                                className="speedButton"
                                dataSpeed="2">
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
                        </Popover>
                        <span 
                        className="playbackRate"
                        onClick={this.showPlaybackSpeedChanger}>
                            {this.state.playBackSpeed}
                        </span>
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
                            percentDone={this.props.percentDone}/>
                        <Row>
                            <FontAwesome 
                                className="playButton" 
                                name={playOrPause}
                                onClick={this.props.handlePlayPauseClick}/> 
                            <span className="videoTime">{this.props.currentTime}</span>
                            <span 
                                className="playbackRate"
                                onClick={this.showPlaybackSpeedChanger}>
                                {this.state.playBackSpeed}
                            </span>
                        </Row>
                    </div>
                )
            }
    }
});
