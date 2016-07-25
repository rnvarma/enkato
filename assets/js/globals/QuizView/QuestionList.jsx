require('bootstrap-loader');
require("css/globals/QuizView/QuestionList");

import React, { Component } from 'react';

import QuestionNode from 'js/globals/QuizView/QuestionNode';

export default class QuestionList extends Component {
    render() {
        var QuestionNodes = this.props.questions.map(function(question, index){
            
            return (
                <QuestionNode
                    key={question.id}
                    question={question}/>
            )
        }.bind(this))
        return(
            <div className="quizQuestionList">
                {QuestionNodes}
            </div>
        )
    }
}