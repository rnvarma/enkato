require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/QuestionNode");
import ChoiceList from 'js/globals/QuizView/ChoiceList';
var FontAwesome = require('react-fontawesome');
var BottomReviewText = require('js/globals/QuizView/ReviewingQuizView/BottomReviewText')

import Button from 'react-bootstrap/lib/Button';


module.exports = React.createClass({
    submitInfo:function(){
        this.props.submitInfo()
        this.props.setCurrentQuestion(-1)
    },
    render:function(){
        if (!this.props.question) {
            return (
                <div className="questionNode noQuiz">
                    The instructor has not created a quiz for this video.
                </div>
            )
        }
        var submitSection = (<div></div>)
        if(this.props.isLast && this.props.numQuestions==this.props.numQsAnswered && !this.props.reviewMode){
            submitSection = (
                <div>
                    <hr className="quizSubmitButtonHR"/>
                    <Button
                        className="quizSubmitAnswerButton"
                        onClick={this.submitInfo}>
                        Submit
                    </Button>
                </div>
            )
        }
        var BottomText = (<div></div>)

        if(this.props.reviewMode){
            BottomText = (
              <BottomReviewText correct={this.props.question.isCorrect} />
            );
        }
        return(
            <div className="questionNode">
                <div className="title"> 
                    <FontAwesome className='arrowIcon' name='arrow-right'/>
                    <span className="titleText">
                        {this.props.question.quizQuestionText} 
                    </span>
                </div>
                <ChoiceList 
                    selectChoice={this.props.selectChoice}
                    className="choiceList"
                    choiceList={this.props.question.choiceList}
                    selectedAnswer={this.props.selectedAnswer}
                    currentQuestionResults={this.props.currentQuestionResults}

                    reviewing={this.props.reviewMode}
                />
                {submitSection}
                {BottomText}
            </div>
        )
    }
})