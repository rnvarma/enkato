require('bootstrap-loader'); 
require("css/globals/VideoPlayer/VideoPlayer")

import React from 'react';
import ReactDOM from 'react-dom';
import getCookie from 'js/globals/GetCookie';

import { styleDuration } from 'js/globals/utility';

import TopicList from 'js/globals/VideoPlayer/TopicList';
import Video from 'js/globals/VideoPlayer/Video';
import ControlBar from 'js/globals/VideoPlayer/ControlBar';
import Player from 'js/globals/VideoPlayer/Player';


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

function clearCurrentTopic(topicList){
    var tList = []
    for(var i=0; i<topicList.length; i++){
        topicList[i].isCurrentTopic = false;
        var currTopic = topicList[i]
        tList.push(currTopic)
    }
    return tList;
}

module.exports  = React.createClass({
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
            questions:[{
                text: "",
                choiceList: [{text:"", id:0}],
                shouldRefocus: false,
                currentFocus: 0,
                id: 1,
                new: true
            }],
            showingOverlay:false,
            takingQuiz:false,
            viewStats: {
                duration: 0,
                end: 0
            },
            s_id: this.props.s_id,
            quizTaken: false,
            completedQuizInfo:{
                result:[],
                numCorrect:0
            },
        };
    },
    trackView: function(uuid, end) {
        var data = {
            v_id: this.state.uuid,
            duration: this.state.viewStats.duration,
            end: end ? end : this.state.Player.getCurrentTime()
        }
        var s_id = this.state.s_id
        $.ajax({
          url: "/trackview" + (s_id ? "/s/" + s_id : ""),
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                this.state.viewStats.duration = 0;
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    onVideoEnd: function() {
        this.trackView(this.state.uuid)
        this.showOverlay();
    },
    onPlayerStateChange: function(event) {
        if (event.data == 0) {
            this.onVideoEnd()
        } else if (event.data == 1) {
        }
    },
    loadQuizData: function(v_id){
        var s_id = $("#s_id").attr("data-sid")

        $.ajax({
            url: "/api/quiz/s/"+s_id+"/v/" + v_id,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("hello")
                console.log(data)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });    
    },
    loadDataFromServer: function(v_id){
        $.ajax({
          url: "/1/v/" + v_id,
          dataType: 'json',
          cache: false,
          success: function(data) {

              /* an optional prop */
              if (this.props.setTopicList) {
                  this.props.setTopicList(data.topicList);
              }
            if (this.state.Player) {
                this.state.Player.destroy();
            }
            this.setState({
                Player: new Player(data.videoID, this.onPlayerStateChange)
            });
            this.setState({topicObjList:data.topicList}, this.afterTopicListUpdate);
            this.forceUpdate();

            this.videoPlayerClass = "";
            if (data.topicList.length == 0) {
              this.videoPlayerClass = "full";
            }
            this.totalTime = data.videoData.duration_clean;

              /* optional prop */
              if (this.props.setGetCurrentTime) {
                  this.props.setGetCurrentTime(() => { return Math.round(this.state.Player.getCurrentTime()) });
              }

          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        this.loadQuizData(v_id)
    },
    updateCurrentState: function(){
        //set time
        var seconds = Math.round(this.state.Player.getCurrentTime())
        var percentDone = (seconds / this.state.Player.getDuration())*100
        var playing = !this.state.Player.paused() && !this.state.Player.ended();
        if (playing)
            this.state.viewStats.duration += 100

        this.setState({
            isPlaying: playing,
            percentDone: percentDone,
            currentTime: styleDuration(seconds),
            topicObjList: updateCurrentTopicOnTime(seconds, this.state.topicObjList)
        }, this.afterTopicListUpdate)
        
        this.setWindowSize()

    },
    showOverlay: function(){
        this.setState({
            showingOverlay: true,
            takingQuiz: false
        });
        this.state.Player.pause();
    },
    showQuiz: function(){
        this.setState({
            showingOverlay: false,
            takingQuiz: true
        })
        this.state.Player.pause()
    },
    closeModal: function() {
        this.setState({
            takingQuiz: false,
            showingOverlay: false
        })
        this.state.Player.play()
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
        this.setState({
            isPlaying: false,
            currentTime: "0:00",
            percentDone: 0
        })
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
        //make sure you're not showing quiz anymore
        this.setState({
            showingOverlay:false,
            takingQuiz:false
        })
        //make sure the video is playing
        this.state.Player.play()
    },
    handlePlayPauseClick: function(){
        // Set the local state and make the API call
        if(this.state.isPlaying){
            this.state.Player.pause();
        } else{
            this.closeModal()
            this.state.Player.play();
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if (this.state.uuid != nextProps.videoUUID) {
            this.trackView(this.state.uuid)
            this.setState({
                uuid: nextProps.videoUUID,
                takingQuiz: false,
                showingOverlay: false
            })
            this.loadDataFromServer(nextProps.videoUUID);
        }
    },
    afterTopicListUpdate() {
        //this function was setting this.topicList to an emptystring when 
        //this.state.topicObjList was empty. I'm Leaving the infrastructure
        //for that functionality intact (which is why I have this dumb if/else).
        //Now we have to add the "Takequiz" button at the bottom of the
        //TopicList, but aashley said this design isn't definite. 
        //              --Arman 7/11/16

        // this was an attempt at efficiency but it failed
        // im sorry
        // the more i think about this the more i think this class is all messed up
        //              --moorejs 7/14/16

        if (this.state.topicObjList.length != 0) {
            this.topicList = (
                <div className="topicButtonColumn">
                    <TopicList 
                        topicObjList={this.state.topicObjList} 
                        handleTopicClick={this.handleTopicClick}
                        showQuiz={this.showQuiz}
                        showingOverlay={this.state.showingOverlay}/>
                </div>
            );
        } else {
            this.topicList = (
                <div></div>
            );
        }
    },
    playVideo: function() {
        this.closeModal();
        this.state.Player.play();
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
                        controlBarHeight={$('.ControlBar').height()}
                        showingOverlay={this.state.showingOverlay}
                        takingQuiz={this.state.takingQuiz}
                        showQuiz={this.showQuiz}
                        videoUUID={this.state.uuid}
                        closeModal={this.closeModal}
                        nextVideo={this.props.nextVideo}
                        playVideo={this.playVideo}/>
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
                        playerContext={this.state.Player.getContext()}
                        showQuiz={this.showQuiz}/>
                </div>
            </div>
        );
    }
})
