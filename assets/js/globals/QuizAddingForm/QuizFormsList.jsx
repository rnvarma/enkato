require('css/globals/QuizAddingForm/QuizFormsList.scss');

import React, { Component } from 'react';

import QuizFormNode from 'js/globals/QuizAddingForm/QuizFormNode';

class QuizFormsList extends Component {
    render() {
        const QuizFormNodes = this.props.questions.map((question, index) => {
            const invalid = this.props.invalidQuestion !== null && this.props.invalidChoice === null && question.id === this.props.invalidQuestion.id;
            return (
                <QuizFormNode
                    key={question.id}
                    handleQuizQuestionChange={this.props.handleQuizQuestionChange}
                    setChoiceList={this.props.setChoiceList}
                    invalid={invalid}
                    invalidChoice={this.props.invalidChoice}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    deleteQuestion={this.props.deleteQuestion}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    scrollToQuestion={this.props.scrollToQuestion}
                    index={index}
                    question={question}/>
            );
        });

        return (
            <div className="quizFormList">
                {QuizFormNodes}
            </div>
        );
    }
}

export default QuizFormsList;