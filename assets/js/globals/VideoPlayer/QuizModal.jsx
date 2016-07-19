require('bootstrap-loader');
var React = require('react');
require("css/globals/VideoPlayer/QuizModal");
import Button from 'react-bootstrap/lib/Button';

var QuizForm = require('js/globals/QuizView/QuizForm');
import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';
import FontAwesome from 'react-fontawesome';

module.exports= React.createClass({
    render:function(){
        var bg_style = (this.props.showingOverlay ? {} : {display:"none"})
        var q_style = (this.props.takingQuiz ? {} : {display:"none"})
        var overlay_style = (this.props.takingQuiz || this.props.showingOverlay ? {} : {display:"none"})
        var nextVideo;
        if (this.props.nextVideo) {
            nextVideo = (
                <div className="nextVideoBtn">
                    <div className="text">
                        Up Next
                    </div>
                    <SeriesViewerSidebarVideoPanel
                        video={this.props.nextVideo} />
                </div>
            )
        }

        var TitleText = ""

        if(this.props.quizTaken){
            var numCorrect = this.props.completedQuizInfo.numCorrect
            var numQuestions = this.props.completedQuizInfo.result.length
            TitleText = "You answered "+numCorrect+" of "+numQuestions+" correctly."
        } else {
            TitleText = "Would You Like to Check Your Understanding?"
        }



        return(
            <div>
                <div className="greyBackground" style={overlay_style}>
                </div>
                <div className="greyBackground" style={bg_style}>
                    <div className="questionText">
                        {TitleText}
                    </div>
                    <Button className="takeQuizButton" onClick={this.props.showQuiz}>
                        Take The Quiz
                    </Button>
                    <div className="noThanks">
                        No, Thanks
                    </div>
                    <div className="rewatch" onClick={this.props.playVideo}>
                        <FontAwesome className="undoIcon" name="undo" />
                        <div className="text">
                            Replay video
                        </div>
                    </div>
                    {nextVideo}
                </div>
                <div className="quizModal" style={q_style}>
                    <QuizForm
                        videoUUID={this.props.videoUUID}
                        closeModal={this.props.closeModal}
                        onFinishButton={this.props.onFinishButton}/>
                </div>
            </div>
        )
    }
})