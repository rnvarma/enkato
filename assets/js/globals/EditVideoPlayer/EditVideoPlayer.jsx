require('bootstrap-loader');
require("css/globals/base.scss");
require("css/globals/EditVideoPlayer/EditVideoPlayer.scss")

import React, { Component } from 'react';

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'

import Video from 'js/globals/videoPlayer/Video';
import ControlBar from 'js/globals/videoPlayer/ControlBar';
import Player from 'js/globals/videoPlayer/Player';
import EditableTopicList from 'js/globals/EditVideoPlayer/EditableTopicList';
import EditControlBar from 'js/globals/EditVideoPlayer/EditControlBar';
import request from 'js/globals/HttpRequest';

const pollInterval = 100;

function updateCurrentTopicOnKey(targetKey, topicList){
    for(var i=0; i<topicList.length; i++){
        if(topicList[i].id == targetKey){
            topicList[i].isCurrentTopic = true;
        } else {
            topicList[i].isCurrentTopic = false;
        }
    }
    return topicList;
}

/*
* ASSUMES LIST IS SORTED BY TIME
* this should be dealt with when adding new topics
*/
function getTopicById(targetKey, topicList) {
    for(var i = 0; i < topicList.length; i++){
        if(topicList[i].id == targetKey){
            return topicList[i];
        }
    }
}

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

function updateTopicNameById(id, newName) {
    for (var i = 0; i < topicList.length; i++) {
        if (topicList[i].id == id) {
            topicList[i].name = newName;
            return topicList;
        }
    }
    return topicList;
}

function removeTopic(targetKey, topicList) {
    for(var i = 0; i < topicList.length; i++){
        if(topicList[i].id == targetKey){
            break
        }
    }
    topicList.splice(i, 1)
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
    constructor(props) {
        super(props)

        this.state = {
            topicObjList: [], 
            isPlaying:false, 
            currentTime:"0:00",
            currentSecond:0,
            percentDone:0,
            Player: null,
            videoDivHeight: 0,
            videoDivWidth: 0,
            uuid: "",
            pollingInterval:null
        }

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
            percentDone: 0
        })
        window.onresize=this.setWindowSize;
        //updates time and playing
        this.setState({
            pollInterval: setInterval(this.updateCurrentState, pollInterval)
        });
        $(window).on("unload", this.syncTopics);
    }

    componentWillMount() {
        this.loadDataFromServer(this.props.videoUUID);
        this.setState({uuid: this.props.videoUUID})
    }

    componentWillUnmount() {
        clearInterval(this.state.pollInterval)
        this.syncTopics();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.uuid != nextProps.videoUUID) {
            this.setState({uuid: nextProps.videoUUID})
            this.loadDataFromServer(nextProps.videoUUID)
        }
        if (!this.state.Player)
            this.loadDataFromServer(nextProps.videoUUID)
    }

    loadDataFromServer(v_id) {
        request.get(`/1/v/${v_id}`, {
            success: (data) => {
                if (this.state.Player){
                    this.syncTopics();
                    if (this.state.Player){
                        this.state.Player.destroy();
                    }
                }
                this.setState({Player: new Player(data.videoID)});
                this.setState({topicObjList:data.topicList})
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
        this.setState({topicObjList: topicList});
    }

    syncTopics() {
        var data = {
            'topics': JSON.stringify(this.state.topicObjList)
        }
        request.post(`/v/${this.state.uuid}/updatetopics`, {
            data: data,
            success: (data) => {
                if (!data.status) {
                    console.log("error")
                }
            }
        })
    }

    sortTopicListByTime(topicList) {
        topicList.sort(function(a, b) {
            return a.time - b.time
        })
    }

    addNewTopic() {
        this.state.Player.pause();
        var currentTime = Math.round(this.state.Player.getCurrentTime())
        var data = {
            currentTime: currentTime,
        }
        request.post(`/v/${this.state.uuid}/addtopic`, {
            data: data,
            success: (data) => {
                if (data.status) {
                    var topicList = this.state.topicObjList;
                    topicList.push(data.newTopic);
                    this.sortTopicListByTime(topicList)
                    this.setState({topicObjList: topicList});
                    //focus on new topic
                    $('#' + data.newTopic.id).focus()
                } else {
                    console.log("Error in request");
                }
            }
        })
    }

    handleTopicDelete(targetKey) {
        var data = {
            uuid: targetKey,
        }
        request.post('/deletetopic', {
            data: data,
            success: (data) => {
                if (data.status) {
                    this.setState({topicObjList: removeTopic(targetKey, this.state.topicObjList)});
                } else {
                    console.log("sad face");
                }
            }
        })
    }

    updateCurrentState(){
        //set time
        var seconds = Math.round(this.state.Player.getCurrentTime())
        this.setState({currentTime:styleTime(seconds)})
        this.setState({currentSecond:seconds})
        var percentDone = (seconds / this.state.Player.getDuration())*100
        this.setState({percentDone:percentDone})
        
        this.setState({
            topicObjList:updateCurrentTopicOnTime(seconds, this.state.topicObjList)
        })
        //set isplaying
        var playing = !this.state.Player.paused();
        this.setState({
            isPlaying: playing
        })
        this.setWindowSize()
    }

    setWindowSize() {
        this.setState({
            videoDivHeight: $(".videoDiv").height()
        });
        this.setState({
            videoDivWidth: $(".videoDiv").width()
        });
    }

    handleScrub(percentOfOne) {
        var duration = this.state.Player.getDuration();
        this.state.Player.seekTo(duration*percentOfOne)
    }

    handleTopicClick(targetKey, time) {
        //First, set the new currentTopic
        this.setState({
            topicObjList:updateCurrentTopicOnKey(targetKey, this.state.topicObjList)
        })
        //Second, Make API call to update video state
        this.state.Player.seekTo(time)
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
        this.state.Player.play()
    }

    playerSeekTo(seconds) {
        this.state.Player.seekTo(seconds)
    }

    render() {
        if (this.state.Player==null) return (<div className="loading">Loading video player...</div>)

        return (
                <div className="ynVideoPlayer">
                    <div className="topicButtonColumn">
                        <EditableTopicList 
                            topicObjList={this.state.topicObjList} 
                            handleTopicClick={this.handleTopicClick}
                            updateName={this.updateTopicName}
                            addNewTopic={this.addNewTopic}
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
