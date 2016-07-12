require('bootstrap-loader'); 
require("css/globals/VideoPlayer/VideoPlayer")

import React from 'react';
import ReactDOM from 'react-dom';

import { styleDuration } from 'js/globals/utility';

import TopicList from 'js/globals/videoPlayer/TopicList';
import Video from 'js/globals/videoPlayer/Video';
import ControlBar from 'js/globals/videoPlayer/ControlBar';
import Player from 'js/globals/videoPlayer/Player';

// How often the video player checks the video's state
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

module.exports  = React.createClass({
    loadDataFromServer: function(v_id){
        console.log("loadDataFromServer")
        $.ajax({
          url: "/1/v/" + v_id,
          dataType: 'json',
          cache: false,
          success: function(data) {
            if (this.state.Player)
                this.state.Player.destroy();
              this.setState({Player: new Player(data.videoID)});
              this.setState({topicObjList:data.topicList}, this.afterTopicListUpdate);

              this.forceUpdate();

              this.videoPlayerClass = "";
              if (data.topicList.length == 0) {
                  this.videoPlayerClass = "full";
              }
              this.totalTime = data.videoData.duration_clean;

          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    updateCurrentState: function(){
        //set time
        var seconds = Math.round(this.state.Player.getCurrentTime())
        this.setState({currentTime:styleDuration(seconds)})
        var percentDone = (seconds / this.state.Player.getDuration())*100
        this.setState({percentDone:percentDone})
        
        this.setState({
            topicObjList:updateCurrentTopicOnTime(seconds, this.state.topicObjList)
        }, this.afterTopicListUpdate);

        //set isplaying
        var playing = !this.state.Player.paused();
        this.setState({
            isPlaying: playing
        })
        this.setWindowSize()

    },
    getInitialState: function() {
        return {
            topicObjList: [], 
            isPlaying: false, 
            currentTime:"0:00",
            percentDone:0,
            Player: null,
            videoDivHeight: 0,
            videoDivWidth: 0,
            uuid: this.props.videoUUID,
        };
    },
    setWindowSize: function(){
        this.setState({
            videoDivHeight: $(".videoDiv").height()
        });
        this.setState({
            videoDivWidth: $(".videoDiv").width()
        });
    },
    componentDidMount: function() {
        this.loadDataFromServer(this.props.videoUUID);
        this.setWindowSize();
        this.setState({isPlaying:false})
        this.setState({currentTime:"0:00"})
        this.setState({percentDone:0})
        window.onresize=this.setWindowSize;
        //updates time and playing
        setInterval(this.updateCurrentState, pollInterval)
    },
    handleScrub: function(percentOfOne) {
        var duration = this.state.Player.getDuration();
        this.state.Player.seekTo(duration*percentOfOne)
    },
    handleTopicClick:function(targetKey, time){
        // First, set the new currentTopic
        this.setState({
            topicObjList:updateCurrentTopicOnKey(targetKey, this.state.topicObjList)
        }, this.afterTopicListUpdate);
        // Second, Make API call to update video state
        this.state.Player.seekTo(time)
    },
    handlePlayPauseClick: function(){
        // Set the local state and make the API call
        if(this.state.isPlaying){
            this.state.Player.pause();
        } else{
            this.state.Player.play();
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if (this.state.uuid != nextProps.videoUUID) {
            this.setState({uuid: nextProps.videoUUID})
            this.loadDataFromServer(nextProps.videoUUID);
        }
    },
    afterTopicListUpdate() {
        if (this.state.topicObjList.length != 0) {
            this.topicList = (
                <div className="topicButtonColumn">
                    <TopicList 
                        topicObjList={this.state.topicObjList} 
                        handleTopicClick={this.handleTopicClick}
                    />
                </div>
            );
        } else {
            this.topicList = "";
        }
    },
    render: function() {
        if (this.state.Player == null) {
            return (<div className="loading">Loading video player...</div>);
        }
        return (
            <div className="ynVideoPlayer"> 
                {this.topicList}
                <div className={`videoDiv ${this.videoPlayerClass}`}>
                    <Video
                        renderVideo={this.state.Player.renderVideo}
                        videoDivHeight={this.state.videoDivHeight}
                        controlBarHeight={$('.ControlBar').height()}/>
                    <ControlBar 
                        className="ControlBar"
                        isPlaying={this.state.isPlaying}
                        videoDuration={this.state.Player.getDuration()}
                        handleTopicClick={this.handleTopicClick}
                        topicObjList={this.state.topicObjList}
                        handlePlayPauseClick={this.handlePlayPauseClick}
                        handleScrub={this.handleScrub}
                        currentTime={this.state.currentTime}
                        totalTime={this.totalTime}
                        percentDone={this.state.percentDone}
                        setPlaybackRate={this.state.Player.setPlaybackRate}
                        playerContext={this.state.Player.getContext()}/>
                </div>
            </div>
        );
    }
})
