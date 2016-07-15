require('css/globals/QuizView/QuizNavFooter.scss');
import Button from 'react-bootstrap/lib/Button';

import React from 'react';

class QuizNavFooter extends React.Component {
    render() {
        return (
            <div className="quizNavFooter">
                <Button
                    className="cancelButton"
                    onClick={this.props.closeModal}>
                    Cancel
                </Button>
                <Button
                    disabled={this.props.currentQuestion == 0}
                    className="backButton"
                    onClick={this.props.prevQuestion}>
                    Back
                </Button>
                <Button
                    disabled={this.props.currentQuestion == this.props.numQuestions -1}
                    className="nextButton"
                    onClick={this.props.nextQuestion}>
                    Next
                </Button>
            </div>
        );
    }
}

export default QuizNavFooter;
