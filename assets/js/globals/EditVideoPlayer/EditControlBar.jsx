import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row'
import Popover from 'react-bootstrap/lib/Popover'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Button from 'react-bootstrap/lib/Button'

import ProgressBar from 'js/globals/videoPlayer/ProgressBar';

export default class EditControlBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playBackSpeed: '1x',
            isShowingSpeedChanger: false
        }

        this.showPlaybackSpeedChanger = this.showPlaybackSpeedChanger.bind(this)
        this.hidePlaybackSpeedChanger = this.hidePlaybackSpeedChanger.bind(this)
        this.setPlaybackSpeed = this.setPlaybackSpeed.bind(this)
        this.forward = this.forward.bind(this)
        this.backward = this.backward.bind(this)
    }

    showPlaybackSpeedChanger() {
        this.setState({
            isShowingSpeedChanger: true
        })
    }

    hidePlaybackSpeedChanger() {
        this.setState({
            isShowingSpeedChanger: false
        })
    }

    setPlaybackSpeed(speed) {
        this.hidePlaybackSpeedChanger()
        this.setState({
            playBackSpeed:speed+'x'
        })
        this.props.setPlaybackRate(speed, this.props.playerContext)
    }

    forward() {
        this.props.seekTo(this.props.currentSecond+1)
    }

    backward() {
        this.props.seekTo(this.props.currentSecond-1)
    }

    render() {
        return (
            <div className="controlBar">
                <ProgressBar 
                    handleScrub={this.props.handleScrub}
                    videoDuration={this.props.videoDuration}
                    handleTopicClick={this.props.handleTopicClick}
                    topicObjList={this.props.topicObjList}
                    percentDone={this.props.percentDone}
                />
                <Row className="videoControls">
                    <FontAwesome 
                        className="playButton" 
                        name={this.props.isPlaying ? "pause" : "play"}
                        onClick={this.props.handlePlayPauseClick}
                    />
                    <span className = "centerBarSpan">
                        <FontAwesome 
                            className="backwardButton" 
                            name="backward"
                            onClick={this.backward}
                        />
                        <span className="videoTime">{this.props.currentTime} / {this.props.totalTime}</span>
                        <FontAwesome 
                            className="forwardButton" 
                            name="forward"
                            onClick={this.forward}
                        />
                    </span>
                    <OverlayTrigger trigger="focus" placement="top" overlay=
                                    {<Popover
                                        id="playback-popover"
                                        className="playbackPopover">
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
                                    </Popover>}>
                                    <span
                                        tabIndex={0}
                                        className="playbackRate"
                                        onClick={this.showPlaybackSpeedChanger}>
                                        {this.state.playBackSpeed}
                                    </span>
                    </OverlayTrigger>
                </Row>
            </div>
        );
    }
}
