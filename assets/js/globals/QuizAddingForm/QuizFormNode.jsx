require('css/globals/QuizAddingForm/QuizFormNode.scss');

import React, { Component } from 'react';

import SingleQuizForm from 'js/globals/QuizAddingForm/SingleQuizForm';

class QuizFormNode extends Component {
    render() {
        return (
            <div className='quizFormNode' id={`${this.props.question.id}q`}>
                <SingleQuizForm
                    questionNumber={this.props.keyCode}
                    handleQuizQuestionChange={this.props.handleQuizQuestionChange}
                    invalid={this.props.invalid}
                    invalidChoice={this.props.invalidChoice}
                    setChoiceList={this.props.setChoiceList}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    deleteQuestion={this.props.deleteQuestion}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    scrollToQuestion={this.props.scrollToQuestion}
                    index={this.props.index}
                    question={this.props.question}/>
            </div>
        );
    }
}

export default QuizFormNode;