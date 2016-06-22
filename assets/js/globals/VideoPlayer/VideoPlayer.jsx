require('bootstrap-loader'); 
require("css/globals/VideoPlayer/VideoPlayer")
var React = require('react')
var ReactDOM = require('react-dom')
var TopicList = require('js/globals/videoPlayer/TopicList')
var Video = require('js/globals/videoPlayer/Video')
var ControlBar = require('js/globals/videoPlayer/ControlBar')
var Player = require('js/globals/videoPlayer/Player');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;



var topicObjList = [
    {
        name: "What Django is",
        time: 2,
        id: 1,
        isCurrentTopic: false,
    },
    {
        name: "How Dynamic Web Servers Work",
        time: 40,
        id: 2,
        isCurrentTopic: false,
    },
    {
        name: "Hard to Learn with Guide",
        time: 60,
        id: 3,
        isCurrentTopic: false,
    },
    {
        name: "djangoproject.com",
        time: 100,
        id: 4,
        isCurrentTopic: false,
    }
]



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


var VideoPlayer = React.createClass({
    loadCommentsFromServer: function(){
        this.setState({topicObjList:topicObjList})
        this.setState({isPlaying:true})
        this.setState({currentTime:"0:00"})
        this.setState({percentDone:0})
    },
    updateCurrentTime: function(){
        var seconds = Math.round(Player.getCurrentTime())
        this.setState({currentTime:styleTime(seconds)})
        var percentDone = (seconds/Player.getDuration())*100
        this.setState({percentDone:percentDone})
        this.setState({
            topicObjList:updateCurrentTopicOnTime(seconds, this.state.topicObjList)
        })
    },
    getInitialState: function() {
        return {
            topicObjList: [], 
            isPlaying:false, 
            currentTime:"0:00",
            percentDone:0,
        };
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.updateCurrentTime, this.props.pollInterval)
    },
    handleScrub: function(percentOfOne) {
        var duration=Player.getDuration();
        Player.seekTo(duration*percentOfOne)
    },
    handleTopicClick:function(targetKey, time){
        //First, set the new currentTopic
        this.setState({
            topicObjList:updateCurrentTopicOnKey(targetKey, this.state.topicObjList)
        })
        //Second, Make API call to update video state
        Player.seekTo(time)
    },
    handlePlayPauseClick: function(){
        //Set the local state and make the API call
        if(this.state.isPlaying){
            this.setState({isPlaying:false});
            Player.pause();
        } else{
            this.setState({isPlaying:true})
            Player.play();
        }
    },
    render: function() {
        return ( 
            <Row classname="ynVideoPlayer">
                <Col className="topicButtonColumn" md={3}>
                    <TopicList 
                        topicObjList={this.state.topicObjList} 
                        handleTopicClick={this.handleTopicClick}
                    />
                </Col>
                <Col md={9}>
                    <Video 
                        renderVideo={Player.renderVideo} 
                        initializePlayer={Player.initializePlayer}
                    />
                    <ControlBar 
                        isPlaying={this.state.isPlaying}
                        topicObjList={topicObjList}
                        getDuration={Player.getDuration}
                        handlePlayPauseClick={this.handlePlayPauseClick}
                        handleScrub={this.handleScrub}
                        currentTime={this.state.currentTime}
                        percentDone={this.state.percentDone}
                    />
                </Col>
            </Row>
        )
    }
})


ReactDOM.render(<VideoPlayer pollInterval={100}/>, document.getElementById('page-anchor'))
