require('bootstrap-loader');
require("css/globals/base.scss");
require("css/globals/EditVideoPlayer/EditVideoPlayer.scss")

var React = require('react')
var ReactDOM = require('react-dom')

var getCookie = require('js/globals/GetCookie')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var NavBar = require('js/globals/NavBar');
var Video = require('js/globals/videoPlayer/Video')
var ControlBar = require('js/globals/videoPlayer/ControlBar')
var Player = require('js/globals/videoPlayer/Player');
var EditableTopicList = require('js/globals/EditVideoPlayer/EditableTopicList')
var pollInterval = 100;

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
    seconds = time%60
    if(seconds<10)
        seconds = "0"+seconds
    //floors the round
    return Math.round((time-30)/60) + ":" + seconds;
}

module.exports = React.createClass({
    loadDataFromServer: function(v_id){
        $.ajax({
          url: "/1/v/" + v_id,
          dataType: 'json',
          cache: false,
          success: function(data) {
            if (this.state.Player){
                this.syncTopics();
                if (this.state.Player){
                    this.state.Player.destroy();
                }
            }
            this.setState({Player: new Player(data.videoID)})
            this.setState({topicObjList:data.topicList})
            this.forceUpdate();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    updateTopicName: function(id, newName) {
        var topicList = this.state.topicObjList;
        for (var i = 0; i < topicList.length; i++) {
            if (topicList[i].id == id) {
                topicList[i].name = newName;
                break;
            }
        }
        this.setState({topicObjList: topicList});
    },
    syncTopics: function() {
        var data = {
            'topics': JSON.stringify(this.state.topicObjList)
        }
        $.ajax({
          url: "/v/" + this.state.uuid + "/updatetopics",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    sortTopicListByTime: function(topicList) {
        topicList.sort(function(a, b) {
            return a.time - b.time
        })
    },
    addNewTopic: function() {
        this.state.Player.pause();
        var currentTime = Math.round(this.state.Player.getCurrentTime())
        var data = {
            currentTime: currentTime,
        }
        $.ajax({
          url: "/v/" + this.state.uuid + "/addtopic",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                var topicList = this.state.topicObjList;
                topicList.push(data.newTopic);
                this.sortTopicListByTime(topicList)
                this.setState({topicObjList: topicList});
                //focus on new topic
                $('#' + data.newTopic.id).focus()
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    handleTopicDelete: function(targetKey) {
        var data = {
            uuid: targetKey,
        }
        $.ajax({
          url: "/deletetopic",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                this.setState({topicObjList: removeTopic(targetKey, this.state.topicObjList)});
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    updateCurrentState: function(){
        //set time
        var seconds = Math.round(this.state.Player.getCurrentTime())
        this.setState({currentTime:styleTime(seconds)})
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

    },
    getInitialState: function() {
        return {
            topicObjList: [], 
            isPlaying:false, 
            currentTime:"0:00",
            percentDone:0,
            Player: null,
            videoDivHeight: 0,
            videoDivWidth: 0,
            uuid: "",
            pollingInterval:null
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
        this.setWindowSize();
        this.setState({isPlaying:true})
        this.setState({currentTime:"0:00"})
        this.setState({percentDone:0})
        window.onresize=this.setWindowSize;
        //updates time and playing
        this.setState({
            pollInterval:setInterval(this.updateCurrentState, pollInterval)
        });
        $(window).unload(this.syncTopics)
    },
    componentWillMount:function(){
        this.loadDataFromServer(this.props.videoUUID);
    },
    componentWillUnmount: function(){
        clearInterval(this.state.pollInterval)
    },
    handleScrub: function(percentOfOne) {
        var duration = this.state.Player.getDuration();
        this.state.Player.seekTo(duration*percentOfOne)
    },
    handleTopicClick:function(targetKey, time){
        //First, set the new currentTopic
        this.setState({
            topicObjList:updateCurrentTopicOnKey(targetKey, this.state.topicObjList)
        })
        //Second, Make API call to update video state
        this.state.Player.seekTo(time)
    },
    handlePlayPauseClick: function(){
        //Set the local state and make the API call
        if(this.state.isPlaying){
            this.setState({isPlaying:false});
            this.state.Player.pause();
        } else{
            this.setState({isPlaying:true})
            this.state.Player.play();
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if (this.state.uuid != nextProps.videoUUID) {
            // $(".videoDiv").remove();
            this.setState({uuid: nextProps.videoUUID})
        }
        this.loadDataFromServer(nextProps.videoUUID)
    },
    playInContext: function(context){
        this.state.Player.play()
    },
    render: function() {
        if(this.state.Player==null) return <div>loading...</div>
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
                        <ControlBar 
                            className="ControlBar"
                            isPlaying={this.state.isPlaying}
                            topicObjList={this.state.topicObjList}
                            getDuration={this.state.Player.getDuration}
                            handlePlayPauseClick={this.handlePlayPauseClick}
                            handleScrub={this.handleScrub}
                            currentTime={this.state.currentTime}
                            percentDone={this.state.percentDone}/>
                    </div>
                </div>
        )
    }
})