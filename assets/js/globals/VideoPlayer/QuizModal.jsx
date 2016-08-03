require('bootstrap-loader');
require("css/globals/VideoPlayer/QuizModal");

import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';

import QuizForm from 'js/globals/QuizView/QuizForm';
import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';
import FontAwesome from 'react-fontawesome';

export default class QuizModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviewMode: false,
            resultsPage: false
        }

        this.onReviewQuizClicked = this.onReviewQuizClicked.bind(this)
        this.showResultsPage = this.showResultsPage.bind(this)
        this.showReviewMode = this.showReviewMode.bind(this)
        this.onRetakeQuiz = this.onRetakeQuiz.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        this.setState({
            resultsPage: this.props.quizTaken
        })
    }

    onReviewQuizClicked(){
        this.setState({
            reviewMode: true,
            resultsPage: false
        })
        this.props.showQuiz()
    }

    showResultsPage() {
        this.setState({
            reviewMode: false,
            resultsPage: true
        })
    }

    showReviewMode() {
        this.setState({
            reviewMode: true,
            resultsPage: false
        })
    }

    onRetakeQuiz() {
        this.setState({
            reviewMode: false,
            resultsPage: false
        })
        this.props.showQuiz()
        
    }

    closeModal() {
        this.setState({
            reviewMode: false,
            resultsPage: this.props.quizTaken
        })
        this.props.closeModal()
    }

    render(){
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
                        video={this.props.nextVideo}/>
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
                        nextVideo={this.props.nextVideo}
                        closeModal={this.closeModal}
                        onFinishButton={this.props.onFinishButton}
                        reviewMode={this.state.reviewMode}
                        completedQuizInfo={this.props.completedQuizInfo}
                        resultsPage={this.state.resultsPage}
                        questions={this.props.questions}
                        showReviewMode={this.showReviewMode}
                        onRetakeQuiz={this.onRetakeQuiz}
                        submitQuizAnswers={this.props.submitQuizAnswers}
                        showResultsPage={this.showResultsPage}/>
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
}