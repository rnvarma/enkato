import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';

import QuizForm from 'js/globals/QuizView/QuizForm';
import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';
import FontAwesome from 'react-fontawesome';

export default class QuizModal extends Component {

    render(){
        var quiz_style = (this.props.showingOverlay ? {} : {display:"none"})

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
                <Button className="takeQuizButton" onClick={this.props.reviewQuiz}>
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
                        closeModal={this.props.closeModal}
                        onFinishButton={this.props.onFinishButton}
                        reviewMode={this.props.reviewMode}
                        completedQuizInfo={this.props.completedQuizInfo}
                        resultsPage={this.props.resultsPage}
                        questions={this.props.questions}
                        showReviewMode={this.props.reviewQuiz}
                        onRetakeQuiz={this.props.retakeQuiz}
                        submitQuizAnswers={this.props.submitQuizAnswers}
                        showResultsPage={this.props.showQuizResultsPage}/>
                </div>
            )
        }

        return(
            <div>
                <div className="greyBackground" style={overlay_style}>
                </div>
                <div className="greyBackground" style={quiz_style}>
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