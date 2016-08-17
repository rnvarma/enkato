import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';

export default class CompletedQuizPage extends Component {
    static propTypes = {
        nextVideo: PropTypes.shape({
            uuid: PropTypes.string.isRequired,
        }).isRequired,
        numCorrect: PropTypes.number.isRequired,
        numQuestions: PropTypes.number.isRequired,
        showReviewMode: PropTypes.func.isRequired,
        onRetakeQuiz: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
    }

    getNextVideoUrl = () => {
        this.props.closeModal();
        window.location.hash = this.props.nextVideo.uuid;
    }

    render() {
        let nextVideo;
        if (this.props.nextVideo) {
            nextVideo = (
                <Button className="nextVideoButton" onClick={this.getNextVideoUrl}>
                    Next Video
                </Button>
            );
        }

        return (
            <div className="CompletedQuizPage">
                <div className="numCorrectReview">
                    You answered {this.props.numCorrect} of {this.props.numQuestions} correctly.
                </div>
                <div className="reviewQuizText">
                    Click below to review your answers and learn more!
                </div>
                <Button className="reviewQuizButton" onClick={this.props.showReviewMode}>
                    Review Answers
                </Button>
                <Button className="retakeQuizButton" onClick={this.props.onRetakeQuiz}>
                    Retake Quiz
                </Button>
                {nextVideo}
            </div>
        );
    }
}
