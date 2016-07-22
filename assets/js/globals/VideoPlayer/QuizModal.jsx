require('bootstrap-loader');
var React = require('react');
require("css/globals/VideoPlayer/QuizModal");
import Button from 'react-bootstrap/lib/Button';

var QuizForm = require('js/globals/QuizView/QuizForm');
import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';
import FontAwesome from 'react-fontawesome';

module.exports= React.createClass({
    getInitialState: function(){
        return {
            reviewMode: false,
            resultsPage: false
        }
    },
    componentDidMount: function() {
        this.setState({
            resultsPage: this.props.quizTaken
        })
    },
    onReviewQuizClicked: function(){
        this.setState({
            reviewMode: true,
            resultsPage: false
        })
        this.props.showQuiz()
    },
    showReviewMode: function() {
        this.setState({
            reviewMode: true,
            resultsPage: false
        })
    },
    closeModal: function() {
        this.setState({
            reviewMode: false,
            resultsPage: this.props.quizTaken
        })
        this.props.closeModal()
    },
    render:function(){
        var bg_style = (this.props.showingOverlay ? {} : {display:"none"})

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
        var greenButton = <div></div>
        var whiteTextButton = <div></div>
        if(this.props.quizTaken){
            var numCorrect = this.props.completedQuizInfo.numCorrect
            var numQuestions = this.props.completedQuizInfo.result.length
            TitleText = "You answered "+numCorrect+" of "+numQuestions+" correctly."

            greenButton = (
                <Button className="takeQuizButton" onClick={this.onReviewQuizClicked}>
                    Review Answers
                </Button>
            )

            whiteTextButton=(
                <div className="noThanks" onClick={this.onRetakeQuiz}>
                    Retake Quiz
                </div>
            )
        } else {
            TitleText = "Would You Like to Check Your Understanding?"

            greenButton = (
                <Button className="takeQuizButton" onClick={this.props.showQuiz}>
                    Take The Quiz
                </Button>
            )
            //nothanks button. just deleted text till we figure out what to do here
            whiteTextButton=(
                <div className="noThanks">
                </div>
            )
        }

        var quizForm = <div></div>
        if(this.props.takingQuiz){
            quizForm = (
                <div className="quizModal">
                    <QuizForm
                        videoUUID={this.props.videoUUID}
                        closeModal={this.closeModal}
                        onFinishButton={this.props.onFinishButton}
                        reviewMode={this.state.reviewMode}
                        completedQuizInfo={this.props.completedQuizInfo}
                        resultsPage={this.state.resultsPage}
                        questions={this.props.questions}
                        showReviewMode={this.showReviewMode}/>
                </div>
            )
        }

        return(
            <div>
                <div className="greyBackground" style={overlay_style}>
                </div>
                <div className="greyBackground" style={bg_style}>
                    <div className="questionText">
                        {TitleText}
                    </div>
                    {greenButton}
                    {whiteTextButton}
                    <div className="rewatch" onClick={this.props.playVideo}>
                        <FontAwesome className="undoIcon" name="undo" />
                        <div className="text">
                            Replay video
                        </div>
                    </div>
                    {nextVideo}
                </div>
                {quizForm}
            </div>
        )
    }
})