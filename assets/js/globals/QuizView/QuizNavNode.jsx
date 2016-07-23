require('css/globals/QuizView/QuizNavNode.scss');

import React from 'react';

class QuizNavNode extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        console.log("wooo")
        this.props.setQuestion(this.props.index)
    }

    render() {
        var className = "quizNavNode"
        className += this.props.active ? " active" : ""
        className += this.props.reviewMode ? " review" : ""
        className += this.props.correct ? " correct" : ""
        return (
            <div
                className={className} 
                onClick={this.onClick}>
                {this.props.order}
            </div>
        );
    }
}

export default QuizNavNode;
