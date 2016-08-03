
require("css/globals/QuizAddingForm/QuizFormNode.scss");

import React, { Component } from 'react';

import SingleQuizForm from 'js/globals/QuizAddingForm/SingleQuizForm';

class QuizFormNode extends Component {
    render() {
        return (
            <div id={`${this.props.question.id}q`}>
                <SingleQuizForm 
                    questionNumber={this.props.keyCode}
                    handleQuizQuestionChange={this.props.handleQuizQuestionChange}
                    setShouldRefocus={this.props.setShouldRefocus}
                    setChoiceList={this.props.setChoiceList}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    deleteQuestion={this.props.deleteQuestion}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    scrollToFromButton={this.props.scrollToFromButton}
                    index={this.props.index}
                    question={this.props.question}/>
            </div>
        );
    }
}

export default QuizFormNode;