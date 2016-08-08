import React, { Component } from 'react';

import { styleDuration } from 'js/globals/utility';

import request from 'js/globals/HttpRequest';
import auth from 'auth';
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

/* Takes string "0:00" and gives back number of seconds*/

function timeToSeconds(time){
    var timeA = time.split(":");
    var seconds = 0;

    if(timeA.length == 2){
        seconds = Number(timeA[0])*60 + Number(timeA[1]);
    }
    else if(timeA.length==3){
        seconds = Number(timeA[0])*3600 + Number(timeA[1])*60 + Number(timeA[2]);
    }
    return seconds;
}

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizDataLoaded: false,
            topicObjList: [], 
            isPlaying: false, 
            currentTime:"0:00",
            percentDone:0,
            Player: null,
            videoDivHeight: 0,
            videoDivWidth: 0,
            uuid: this.props.videoUUID,
            questions:[],
            viewStats: {
                duration: 0,
                end: 0
            },
            seriesUUID: this.props.seriesUUID,
            videoTitle: "",
            breakpoints: [],
            currentBreakpoint: null,

            showingOverlay:false,
            takingQuiz:false,
            reviewMode: false,
            resultsPage: false,
            quizTaken: false,

            completedQuizInfo:{
                result:[],
                numCorrect:0
            },
            numQuestions: 0,
            pollInterval:null,
        }

        this.trackView = this.trackView.bind(this);
        this.onVideoEnd = this.onVideoEnd.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        this.onPlayerReady = this.onPlayerReady.bind(this);
        this.loadQuizData = this.loadQuizData.bind(this);
        this.submitQuiz = this.submitQuiz.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.updateCurrentState = this.updateCurrentState.bind(this);
        this.showOverlay = this.showOverlay.bind(this);
        this.showQuiz = this.showQuiz.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setWindowSize = this.setWindowSize.bind(this);
        this.handleScrub = this.handleScrub.bind(this);
        this.handleTopicClick = this.handleTopicClick.bind(this);
        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
        this.onFinishButton = this.onFinishButton.bind(this);
        this.afterTopicListUpdate = this.afterTopicListUpdate.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.retakeQuiz = this.retakeQuiz.bind(this);
        this.reviewQuiz = this.reviewQuiz.bind(this);
        this.showQuizResultsPage = this.showQuizResultsPage.bind(this);
        this.finishBreakpoint = this.finishBreakpoint.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
    }

    retakeQuiz() {
        this.setState({
            showingOverlay: false,
            takingQuiz: true,
            reviewMode: false,
            resultsPage: false,
        })
    }

    reviewQuiz() {
        this.setState({
            showingOverlay: false,
            takingQuiz: true,
            reviewMode: true,
            resultsPage: false,
        })
    }

    showQuizResultsPage() {
        this.setState({
            reviewMode: false,
            resultsPage: true
        })
    }

    componentDidMount() {
        this.setWindowSize();
        this.setState({
            isPlaying: false,
            currentTime: "0:00",
            percentDone: 0,
            pollInterval: setInterval(this.updateCurrentState, pollInterval),
        })
        this.loadDataFromServer(this.props.videoUUID);

        $(window).on('resize', this.setWindowSize); /* todo: debounce this */
    }

    componentWillUnmount() {
        $(window).off('resize');
    }

    loadDataFromServer(v_id){
        request.get(`/1/v/${v_id}`, {
            success: (data) => {
                var vidPlayer= new Player(data.videoID, this.onPlayerStateChange, this.onPlayerReady);
                if (this.state.Player) {
                    this.state.Player.destroy();
                }
                this.setState({
                    Player: vidPlayer,
                    breakpoints: data.breakpoints,
                });
                /* an optional prop */
                if (this.props.setTopicList) {
                  this.props.setTopicList(data.topicList);
                }

                this.setState({
                    topicObjList: data.topicList
                }, this.afterTopicListUpdate);

                this.forceUpdate();

                this.videoPlayerClass = "";
                if (data.topicList.length == 0) {
                  this.videoPlayerClass = "full";
                }
                this.totalTime = data.videoData.duration_clean;

                this.setState({
                    videoTitle: data.videoData.name
                });
                /* optional prop */
                if (this.props.setGetCurrentTime) {
                      this.props.setGetCurrentTime(() => { return Math.round(this.state.Player.getCurrentTime()) });
                }

                this.seconds = null;
            }
        })
        this.loadQuizData(v_id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.uuid != nextProps.videoUUID) {
            this.trackView(this.state.uuid)
            this.setState({
                uuid: nextProps.videoUUID,
                takingQuiz: false,
                showingOverlay: false,
            })
            this.loadDataFromServer(nextProps.videoUUID);
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.pollInterval);
    }

    trackView(uuid, end) {
        var data = {
            v_id: this.state.uuid,
            duration: this.state.viewStats.duration,
            end: end ? end : this.state.Player.getCurrentTime()
        }
        var seriesUUID = this.state.seriesUUID
        if (seriesUUID)
            var url = `/trackview/s/${seriesUUID}`;
        else
            var url = `trackview`;
        request.post(url, {
            data: data,
            success: (data) => {
                if (data.status) {
                    this.state.viewStats.duration = 0;
                } else {
                    console.log("sad face");
                }
            }
        })
    }

    onVideoEnd() {
        this.trackView(this.state.uuid)
        this.showOverlay();
    }

    onPlayerStateChange(event) {
        if (event.data == 0) {
            this.onVideoEnd()
        } else if (event.data == 1) {
        }
    }

    onPlayerReady(event){
        if (this.props.setStartTime() != null){
            this.state.currentTime = Number(this.props.setStartTime());
            var startTime = this.state.currentTime;
            var startSeconds;
            if(typeof startTime == "string"){
                startSeconds = timeToSeconds(startTime);
            }
            else{
                startSeconds= startTime;
            }
            event.target.seekTo(startSeconds);
            event.target.playVideo();
        }
        if(this.props.loadQuiz){
            if(this.props.loadQuiz() == "true"){
                this.showQuiz();
                event.target.pauseVideo();
            }
        }
    }

    loadQuizData(v_id){
        var seriesUUID = this.state.seriesUUID
        if (auth.loggedIn()) {
            request.get(`/1/studentquizdata/s/${seriesUUID}/v/${v_id}`, {
                success: (data) => {
                    this.setState(data)
                    if (data.quizTaken)
                        this.setState({resultsPage: true})
                    this.setState({quizDataLoaded: true})
                }
            })
        }
    }

    submitQuiz(answers) {
        request.post(`/logquiz/s/${this.state.seriesUUID}/v/${this.state.uuid}`, {
            data: answers,
            success: (data) => {
                this.setState({
                    quizTaken: true,
                    completedQuizInfo: data,
                    reviewMode: false,
                    resultsPage: true,
                });
            }
        })
    }

    updateCurrentState(){
        //set time
        const previousSeconds = this.seconds;
        this.seconds = Math.round(this.state.Player.getCurrentTime());

        var percentDone = (this.seconds / this.state.Player.getDuration())*100
        var playing = !this.state.Player.paused() && !this.state.Player.ended();
        if (playing)
            this.state.viewStats.duration += 100

        if (previousSeconds !== this.seconds && this.state.breakpoints[this.seconds]) {
            this.setState({
                currentBreakpoint: this.state.breakpoints[this.seconds],
            });
        }

        this.setState({
            isPlaying: playing,
            percentDone: percentDone,
            currentTime: styleDuration(this.seconds),
            topicObjList: updateCurrentTopicOnTime(this.seconds, this.state.topicObjList)
        }, this.afterTopicListUpdate)
        
        this.setWindowSize()
    }

    showOverlay(){
        this.state.Player.pause();
        this.setState({
            showingOverlay: true,
            takingQuiz: false
        });
    }

    showQuiz(){
        this.state.Player.pause()
        if (auth.loggedIn()) {
            this.setState({
                showingOverlay: false,
                takingQuiz: true,
                reviewMode: false,
                resultsPage: this.state.quizTaken
            })
        } else {
            this.props.openRegisterModal(() => {
                this.setState({
                    showingOverlay: false,
                    takingQuiz: true,
                    reviewMode: false,
                })
                this.loadQuizData(this.state.uuid)
            });
        }
        
    }

    closeModal() {
        this.setState({
            takingQuiz: false,
            showingOverlay: false,
        })
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

    handleTopicClick(targetKey, time){
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
    }

    handlePlayPauseClick(){
        // Set the local state and make the API call
        if(this.state.isPlaying){
            this.state.Player.pause();
        } else{
            this.closeModal()
            this.state.Player.play();
        }
    }

    onFinishButton(){
        this.setState({
            showingOverlay: true,
            takingQuiz: false,
        })
        this.loadQuizData(this.props.videoUUID)
    }

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
    }

    playVideo() {
        this.closeModal();
        this.state.Player.play();
    }

    finishBreakpoint() {
        this.setState({
            currentBreakpoint: null,
        });
        this.state.Player.play();
    }

    pauseVideo() {
        this.state.Player.pause();
    }

    render() {
        if (this.state.Player == null) {
            return (<div className="loading">Loading video player...</div>);
        }
        return (
            <div>
                <div className="videoTitle headline">
                    {this.state.videoTitle}
                </div>
                <div className="ynVideoPlayer"> 
                    {this.topicList}
                    <div className={`videoDiv ${this.videoPlayerClass}`}>
                        <Video
                            renderVideo={this.state.Player.renderVideo}
                            videoDivHeight={this.state.videoDivHeight}
                            controlBarHeight={$('.ControlBar').height()}
                            showingOverlay={this.state.showingOverlay}
                            takingQuiz={this.state.takingQuiz}
                            reviewMode={this.state.reviewMode}
                            resultsPage={this.state.resultsPage}
                            showQuiz={this.showQuiz}
                            videoUUID={this.state.uuid}
                            closeModal={this.closeModal}
                            nextVideo={this.props.nextVideo}
                            playVideo={this.playVideo}
                            completedQuizInfo={this.state.completedQuizInfo}
                            quizTaken={this.state.quizTaken}
                            questions={this.state.questions}
                            onFinishButton={this.onFinishButton}
                            quizDataLoaded={this.state.quizDataLoaded}
                            submitQuizAnswers={this.submitQuiz}
                            retakeQuiz={this.retakeQuiz}
                            reviewQuiz={this.reviewQuiz}
                            showQuizResultsPage={this.showQuizResultsPage}
                            breakpoint={this.state.currentBreakpoint}
                            finishBreakpoint={this.finishBreakpoint}
                            pauseVideo={this.pauseVideo}/>
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
            </div>
        );
    }
}
