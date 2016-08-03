require('css/globals/QuizAddingForm/QuizFormsList.scss');

import React, { Component } from 'react';

import QuizFormNode from 'js/globals/QuizAddingForm/QuizFormNode';

class QuizFormsList extends Component {
    render() {
        const QuizFormNodes = this.props.questions.map((question, index) => {
            return (
                <QuizFormNode
                    key={question.id}
                    handleQuizQuestionChange={this.props.handleQuizQuestionChange}
                    setShouldRefocus={this.props.setShouldRefocus}
                    setChoiceList={this.props.setChoiceList}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    deleteQuestion={this.props.deleteQuestion}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    scrollToFromButton={this.props.scrollToFromButton}
                    index={index}
                    question={question} />
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