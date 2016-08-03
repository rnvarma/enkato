require('bootstrap-loader');
require("css/globals/QuizView/ReviewingQuizView/CompletedQuizPage");

import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';

export default class CompletedQuizPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            nextVideoUrl:null
        }

        this.getNextVideoUrl = this.getNextVideoUrl.bind(this);
    }

    componentDidMount(){
        this.setState({
            nextVideoUrl: this.getNextVideoUrl
        });
    }

    getNextVideoUrl(){
        window.location.hash = this.props.nextVideo.uuid;
    }

    render() {
        var nextVideo
        if(this.props.nextVideo){
            nextVideo=(
                <Button
                className="nextVideoButton"
                onClick ={this.state.nextVideoUrl}>
                Next Video
                </Button>
            )
        }


        return(
            <div className="CompletedQuizPage">
                <div className="numCorrectReview">
                    You answered {this.props.numCorrect} of {this.props.numQuestions} correctly.
                </div>
                <div className="reviewQuizText">
                    Click below to review your answers and learn more!
                </div>
                <Button
                    className="reviewQuizButton"
                    onClick={this.props.showReviewMode}>
                    Review Answers
                </Button>
                <Button
                    className="retakeQuizButton"
                    onClick={this.props.onRetakeQuiz}>
                    Retake Quiz
                </Button>
                {nextVideo}
            </div>
        )
    }
}