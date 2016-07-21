require('css/globals/QuizView/QuizNavFooter.scss');
import Button from 'react-bootstrap/lib/Button';

import React from 'react';

class QuizNavFooter extends React.Component {
    render() {
        var disableAll = this.props.showGradingPage || !this.props.quizExists;

        var rightButton = <div></div>
        if(this.props.reviewMode&&(this.props.currentQuestion == this.props.numQuestions -1)){
            rightButton = (
                <Button className="finishButton" onClick={this.props.onFinishButton}>
                    Finish
                </Button>
            )
        } else {
            rightButton = (
                <Button
                    disabled={(this.props.currentQuestion == this.props.numQuestions -1) || disableAll}
                    className="nextButton"
                    onClick={this.props.nextQuestion}>
                    Next
                </Button>
            )
        }

        return (
            <div className="quizNavFooter">
                <Button
                    className="cancelButton"
                    onClick={this.props.closeModal}>
                    Cancel
                </Button>
                <Button
                    disabled={this.props.currentQuestion == 0 || disableAll}
                    className="backButton"
                    onClick={this.props.prevQuestion}>
                    Back
                </Button>
                {rightButton}
            </div>
        );
    }
}

export default QuizNavFooter;
