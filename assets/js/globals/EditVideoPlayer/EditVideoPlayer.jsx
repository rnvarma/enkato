require('bootstrap-loader');
require('css/globals/base.scss');
require('css/globals/EditVideoPlayer/EditVideoPlayer.scss');

import React, { Component } from 'react';

import request from 'js/globals/HttpRequest';
import { styleDuration } from 'js/globals/utility';
import ConfirmModal from 'js/globals/ConfirmModal';
import Video from 'js/globals/videoPlayer/Video';
import Player from 'js/globals/videoPlayer/Player';
import EditableTopicList from 'js/globals/EditVideoPlayer/EditableTopicList';
import EditControlBar from 'js/globals/EditVideoPlayer/EditControlBar';

const pollInterval = 100;

function updateCurrentTopicOnTime(seconds, topicList){
    if(topicList.length==0) return []
    var setTrue = false;
    for(var i=0; i<topicList.length; i++){
        topicList[i].isCurrentTopic = false
        if(!setTrue && topicList[i].time > seconds){
            if(i==0) continue;
            topicList[i-1].isCurrentTopic = true;
            setTrue=true;
        }
    }
    if(!setTrue) topicList[i-1].isCurrentTopic=true;
    return topicList;
}

function styleTime(time){
    let seconds = time%60
    if(seconds<10)
        seconds = "0"+seconds
    //floors the round
    return Math.round((time-30)/60) + ":" + seconds;
}

export default class EditVideoPlayer extends Component {
    constructor() {
        super()

        this.state = {
            topicObjList: [], 
            isPlaying:false, 
            currentTime:"0:00",
            currentSecond:0,
            percentDone:0,
            Player: null,
            videoDivHeight: 0,
            videoDivWidth: 0,
            videoUUID: "",
            pollingInterval:null
        };
        this.removedTopics = [];

        this.loadDataFromServer = this.loadDataFromServer.bind(this)
        this.updateTopicName = this.updateTopicName.bind(this)
        this.syncTopics = this.syncTopics.bind(this)
        this.sortTopicListByTime = this.sortTopicListByTime.bind(this)
        this.addNewTopic = this.addNewTopic.bind(this)
        this.handleTopicDelete = this.handleTopicDelete.bind(this)
        this.updateCurrentState = this.updateCurrentState.bind(this)
        this.setWindowSize = this.setWindowSize.bind(this)
        this.handleScrub = this.handleScrub.bind(this)
        this.handleTopicClick = this.handleTopicClick.bind(this)
        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
        this.playInContext = this.playInContext.bind(this)
        this.playerSeekTo = this.playerSeekTo.bind(this)
    }

    componentDidMount() {
        this.setWindowSize();
        this.setState({
            isPlaying: true,
            currentTime: "0:00",
            currentSecond: 0,
            percentDone: 0,
            pollInterval: setInterval(this.updateCurrentState, pollInterval),
        });
        $(window).on('unload', this.syncTopics);
        $(window).on('resize', this.setWindowSize);
    }

    componentWillMount() {
        this.loadDataFromServer(this.props.videoUUID);
        this.setState({videoUUID: this.props.videoUUID});
    }

    componentWillUnmount() {
        clearInterval(this.state.pollInterval);
        $(window).off('unload');
        $(window).off('resize');
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.videoUUID != nextProps.videoUUID) {
            this.setState({videoUUID: nextProps.videoUUID});
            this.loadDataFromServer(nextProps.videoUUID);
        }

        /* save and publish button was hit */
        if (nextProps.publishAnnotations) {
            this.syncTopics();
            this.props.closeAnnotationsModal();
        }
    }

    /* destroys any old video player, creates a new one */
    loadDataFromServer(v_id) {
        request.get(`/1/v/${v_id}`, {
            success: (data) => {
                if (this.state.Player) {
                    this.state.Player.destroy();
                }

                this.setState({
                    Player: new Player(data.videoID),
                    topicObjList: data.topicList,
                });

                this.forceUpdate();
                this.totalTime = data.videoData.duration_clean;
            }
        })
    }

    updateTopicName(id, newName) {
        var topicList = this.state.topicObjList;
        for (var i = 0; i < topicList.length; i++) {
            if (topicList[i].id == id) {
                topicList[i].name = newName;
                break;
            }
        }
        this.setState({
            topicObjList: topicList
        });
        this.props.setAnnotationsToSave();
    }

    /* When user publishes */
    syncTopics() {
        const payload = {
            topics: JSON.stringify(this.state.topicObjList),
            removed_topics: JSON.stringify(this.removedTopics),
        };
        request.post(`/v/${this.state.videoUUID}/updatetopics`, {
            data: payload,
            success: (data) => {
                if (data.status) {
                    var topicList = this.state.topicObjList
                    for (var i = 0; i < topicList.length; i++) {
                        topicList[i].committed = true;
                    }
                } else {
                    console.log('error');
                }
            }
        })
    }

    sortTopicListByTime(topicList) {
        topicList.sort(function(a, b) {
            return a.time - b.time;
        });
    }

    /* adds a new topic to topicObjList, sorts topic list, focuses on new topic */
    addNewTopic(name = '', topicTime = null) {
        this.state.Player.pause();

        var topicList = this.state.topicObjList.filter((topic) => {
            if (topic.name.length == 0) {
                if (topic.committed) {
                    this.removedTopics.push(topic)
                }
                return false
            }
            return true;
        })

        var time;

        if (topicTime == null)
            time = Math.round(this.state.Player.getCurrentTime());
        else {
            time = topicTime;
        }
        const newTopic = {
            id: `fake_${Date.now()}`, /* fake id, not in DB yet */
            committed: false,
            name: name,
            time: time,
            time_clean: styleDuration(time),
            isCurrentTopic: true,
        };
        const newTopicList = [...this.state.topicObjList, newTopic];
        this.sortTopicListByTime(newTopicList);
        this.setState({
            topicObjList: newTopicList,
        }, function() { $(`#${newTopic.id}`).focus(); });
        this.props.setAnnotationsToSave();
    }

    /* splices topic out of list by id, adds to removedTopics, sets topic list */
    handleTopicDelete(id) {
        const newTopicList = this.state.topicObjList.filter((topic) => {
            if (topic.real_id !== id && topic.id !== id) {
                return true;
            }
            if (topic.committed) { /* only add real topic to delete list */
                this.removedTopics.push(topic);
            }
            return false;
        });
        this.setState({
            topicObjList: newTopicList,
        });
        this.props.setAnnotationsToSave();
    }

    updateCurrentState() {
        const seconds = Math.round(this.state.Player.getCurrentTime());
        const percentDone = (seconds / this.state.Player.getDuration()) * 100;
        this.setState({
            currentTime: styleTime(seconds),
            currentSecond: seconds,
            percentDone: percentDone,
            topicObjList: updateCurrentTopicOnTime(seconds, this.state.topicObjList),
            isPlaying: !this.state.Player.paused(),
        });
        this.setWindowSize();
    }

    setWindowSize() {
        this.setState({
            videoDivHeight: $(".videoDiv").height(),
            videoDivWidth: $(".videoDiv").width(),
        });
    }

    handleScrub(percentOfOne) {
        var duration = this.state.Player.getDuration();
        this.state.Player.seekTo(duration*percentOfOne)
    }

    handleTopicClick(targetKey, time) {
        this.state.Player.seekTo(time);
    }

    handlePlayPauseClick() {
        //Set the local state and make the API call
        if(this.state.isPlaying){
            this.state.Player.pause();
        } else{
            this.state.Player.play();
        }
    }
    
    playInContext(context) {
        this.state.Player.play();
    }

    playerSeekTo(seconds) {
        this.state.Player.seekTo(seconds);
    }

    render() {
        if (this.state.Player==null) return (<div className="loading">Loading video player...</div>)

        return (
                <div className="ynVideoPlayer">
                    <ConfirmModal
                        showing={this.props.showingAnnotationSave}
                        description="Are you sure you want to navigate away? Your changes are not saved and will be gone forever."
                        acceptCallback={this.props.onConfirmQuit}
                        cancelCallback={this.props.setKeepAnnotations}/>
                    <div className="topicButtonColumn">
                        <EditableTopicList
                            topicObjList={this.state.topicObjList}
                            handleTopicClick={this.handleTopicClick}
                            updateName={this.updateTopicName}
                            addNewTopic={this.addNewTopic}
                            videoDuration={this.state.Player.getDuration()}
                            handleTopicDelete={this.handleTopicDelete}
                            playVideo={this.playInContext}/>
                    </div>
                    <div className="videoDiv">
                        <Video
                            renderVideo={this.state.Player.renderVideo}
                            videoDivHeight={this.state.videoDivHeight}
                            controlBarHeight={$('.ControlBar').height()}/>
                        <EditControlBar 
                            className="ControlBar"
                            isPlaying={this.state.isPlaying}
                            videoDuration={this.state.Player.getDuration()}
                            topicObjList={this.state.topicObjList}
                            getDuration={this.state.Player.getDuration}
                            handlePlayPauseClick={this.handlePlayPauseClick}
                            handleScrub={this.handleScrub}
                            currentTime={this.state.currentTime}
                            currentSecond={this.state.currentSecond}
                            totalTime={this.totalTime}
                            percentDone={this.state.percentDone}
                            setPlaybackRate={this.state.Player.setPlaybackRate}
                            playerContext={this.state.Player.getContext()}
                            seekTo={this.playerSeekTo}/>
                    </div>
                </div>
        )
    }
}
