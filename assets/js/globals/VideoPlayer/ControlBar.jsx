require('bootstrap-loader');
require("css/globals/VideoPlayer/ControlBar")
var React = require('react');
var ReactDOM = require('react-dom');
var FontAwesome = require('react-fontawesome');
var Row = require('react-bootstrap').Row;
var Popover = require('react-bootstrap').Popover;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var ProgressBar = require('js/globals/videoPlayer/ProgressBar')

module.exports = React.createClass({
    showPlaybackSpeedChanger: function(){
        $('.buttonsyo').show()
        console.log(this.state.isShowingSpeedChanger)
    },
    getInitialState: function(){
        return{
            playBackSpeed:'1x',
            isShowingSpeedChanger:false
        }
    },
    setPlaybackSpeed: function(){
        $('.buttonsyo').hide()
        console.log('hide')
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
                         <OverlayTrigger trigger='click' rootClose placement="top" overlay={
                            <Popover className="buttonsyo">
                                <div onClick={this.setPlaybackSpeed} >
                                    2x
                                </div>
                                <div>
                                    1.5x
                                </div>
                                <div>
                                    1x
                                </div>
                                <div>
                                    .5x
                                </div>
                                <div>
                                    .25x
                                </div>
                            </Popover>
                        }>
                            <span 
                            className="playbackRate"
                            onClick={this.showPlaybackSpeedChanger}>
                                1x
                            </span>
                        </OverlayTrigger>
                    </Row>
                </div>
            )
    }
});