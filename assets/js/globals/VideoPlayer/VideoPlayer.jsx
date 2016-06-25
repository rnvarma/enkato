require('bootstrap-loader'); 
require("css/globals/VideoPlayer/VideoPlayer")
var React = require('react')
var ReactDOM = require('react-dom')
var TopicList = require('js/globals/videoPlayer/TopicList')
var Video = require('js/globals/videoPlayer/Video')
var ControlBar = require('js/globals/videoPlayer/ControlBar')
var Player = require('js/globals/videoPlayer/Player');
pollInterval=100

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

function styleTime(time){
    seconds = time%60
    if(seconds<10)
        seconds = "0"+seconds
    //floors the round
    return Math.round((time-30)/60) + ":" + seconds;
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
            this.setState({Player: new Player(data.videoID)})
            this.setState({topicObjList:data.topicList})
            this.forceUpdate();
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
        this.setState({isPlaying:true})
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
            this.loadDataFromServer(nextProps.videoUUID);
        }
    },
    render: function() {
        if(this.state.Player==null) return <div>loading...</div>
        return ( 
            <div className="ynVideoPlayer">
                <div className="topicButtonColumn">
                    <TopicList 
                        topicObjList={this.state.topicObjList} 
                        handleTopicClick={this.handleTopicClick}/>
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
