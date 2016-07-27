import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import Button from 'react-bootstrap/lib/Button';

import ChoiceList from 'js/globals/QuizView/ChoiceList';
import BottomReviewText from 'js/globals/QuizView/ReviewingQuizView/BottomReviewText';

export default class QuestionNode extends Component {
    render() {
        if (!this.props.question) {
            return (
                <div className="questionNode noQuiz">
                    The instructor has not created a quiz for this video.
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
            </div>
        )
    }
}