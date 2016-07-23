require('css/globals/QuizView/QuizNavFooter.scss');
import Button from 'react-bootstrap/lib/Button';
var BottomReviewText = require('js/globals/QuizView/ReviewingQuizView/BottomReviewText')


import React from 'react';

class QuizNavFooter extends React.Component {
    render() {
        var disableAll = this.props.resultsPage;

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

      let prevNextBtns;
      if (this.props.quizExists) {
        prevNextBtns = (
          <span>
            <Button
              disabled={this.props.currentQuestion == 0 || disableAll}
              className="backButton"
              onClick={this.props.prevQuestion}
            >
              Back
            </Button>
            {rightButton}
          </span>
        );
      }

      var bottomLeftText = <div></div>

      if(this.props.reviewMode){
        bottomLeftText = (
          <BottomReviewText correct={this.props.isCorrect} />
        );
      } else if(!disableAll) {
        bottomLeftText = (
          <div className="showNumAnswered">
              {this.props.numQsAnswered} OF {this.props.numQuestions} ANSWERED
          </div>
        )
      }

      return (
        <div className="quizNavFooter">
          {bottomLeftText}
          <Button
            className="cancelButton"
            onClick={this.props.closeModal}>
            Cancel
          </Button>
          {prevNextBtns}
        </div>
      );
    }
}

export default QuizNavFooter;
