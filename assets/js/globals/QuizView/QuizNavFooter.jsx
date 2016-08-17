import React, { PropTypes, Component } from 'react';

import Button from 'react-bootstrap/lib/Button';

import BottomReviewText from 'js/globals/QuizView/ReviewingQuizView/BottomReviewText';

export default class QuizNavFooter extends Component {
    static propTypes = {
        currentQuestion: PropTypes.number.isRequired,
        numQuestions: PropTypes.number.isRequired,
        numQsAnswered: PropTypes.number.isRequired,
        quizExists: PropTypes.bool.isRequired,
        reviewMode: PropTypes.bool.isRequired,
        resultsPage: PropTypes.bool.isRequired,
        isCorrect: PropTypes.bool.isRequired,
        submitInfo: PropTypes.func.isRequired,
        onFinishButton: PropTypes.func.isRequired,
        nextQuestion: PropTypes.func.isRequired,
        prevQuestion: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
    }

    submitInfo = () => {
        this.props.submitInfo();
    }

    render() {
        const disableAll = this.props.resultsPage;

        let rightButton;
        if (this.props.reviewMode && (this.props.currentQuestion === this.props.numQuestions - 1)) {
            rightButton = (
                <Button className="finishButton" onClick={this.props.onFinishButton}>
                    Finish
                </Button>
            );
        } else {
            rightButton = (
                <Button
                    disabled={(this.props.currentQuestion === this.props.numQuestions - 1) || disableAll}
                    className="btn-primary"
                    onClick={this.props.nextQuestion}
                >
                    Next
                </Button>
            );
        }

        let prevNextBtns;
        if (this.props.quizExists) {
            prevNextBtns = (
                <span>
                    <Button
                        disabled={(this.props.currentQuestion === 0 && !this.props.reviewMode) || disableAll}
                        className="btn-secondary"
                        onClick={this.props.prevQuestion}
                    >
                        Back
                    </Button>
                    {rightButton}
                </span>
            );
        }

        let bottomLeftText;
        if (this.props.numQuestions !== 0) {
            if (this.props.reviewMode) {
                bottomLeftText = (
                    <BottomReviewText correct={this.props.isCorrect} />
                );
            } else if (!disableAll) {
                if (this.props.numQsAnswered !== this.props.numQuestions) {
                    bottomLeftText = (
                        <div className="showNumAnswered smallTitle">
                            {this.props.numQsAnswered} OF {this.props.numQuestions} ANSWERED
                        </div>
                    );
                } else {
                    bottomLeftText = (
                        <div>
                            <Button
                                className="btn-primary"
                                onClick={this.submitInfo}
                            >
                                Submit
                            </Button>
                        </div>
                    );
                }
            }
        }

        return (
            <div className="quizNavFooter">
                {bottomLeftText}
                <Button
                    className="btn-secondary"
                    onClick={this.props.closeModal}
                >
                    Cancel
                </Button>
                {prevNextBtns}
            </div>
        );
    }
}
