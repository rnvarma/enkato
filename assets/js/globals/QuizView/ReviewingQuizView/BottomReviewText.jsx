require('bootstrap-loader');
require("css/globals/QuizView/ReviewingQuizView/BottomReviewText");

import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

export default class BottomReviewText extends Component {
    render() {
        var text = ""
        if(this.props.correct){
            text = "You answered this correctly!"
        } else {
            text = "You answered this incorrectly."
        }
        return(
            <div className="correctOrNot">
                <FontAwesome
                    className="correctness-icon"
                    name={(this.props.correct)?"check-circle":"times-circle"}
                    id={(this.props.correct)?"check-correct":"check-incorrect"}/>
                <span className="correctnessText">
                    {text}
                </span>
            </div>
        ) 
    }
}