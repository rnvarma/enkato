require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/ReviewingQuizView/CompletedQuizPage");
import Button from 'react-bootstrap/lib/Button';


module.exports = React.createClass({
    render:function(){
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
            </div>
        )
    }
})