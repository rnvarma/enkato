require('bootstrap-loader');
require("css/globals/QuizView/QuestionNode");

import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import Button from 'react-bootstrap/lib/Button';

import ChoiceList from 'js/globals/QuizView/ChoiceList';
import BottomReviewText from 'js/globals/QuizView/ReviewingQuizView/BottomReviewText';

export default class QuestionNode extends Component {
    constructor(props) {
        super(props)

        this.submitInfo = this.submitInfo.bind(this)
    }

    submitInfo() {
        this.props.submitInfo()
    }

    render() {
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
            </div>
        )
    }
}