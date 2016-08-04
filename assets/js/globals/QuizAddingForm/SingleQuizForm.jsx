require('css/globals/QuizAddingForm/singlequizaddingform.scss');
import React, { Component } from 'react';

import QuizQuestion from 'js/globals/QuizAddingForm/QuizQuestion';
import AddOptionButton from 'js/globals/QuizAddingForm/AddOptionButton';
import MCChoiceList from 'js/globals/QuizAddingForm/MCChoiceList';

class SingleQuizForm extends Component {
    constructor() {
        super();

        this.handleQuizQuestionChange = this.handleQuizQuestionChange.bind(this);
        this.handleChoiceTextChange = this.handleChoiceTextChange.bind(this);
        this.onQuestionUp = this.onQuestionUp.bind(this);
        this.onQuestionDown = this.onQuestionDown.bind(this);
        this.moveFocusUp = this.moveFocusUp.bind(this);
        this.moveFocusDownOrAddNewChoice = this.moveFocusDownOrAddNewChoice.bind(this);
        this.addNewChoice = this.addNewChoice.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.makeChoiceIsCorrect = this.makeChoiceIsCorrect.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    componentDidUpdate() {
        for (var i = 0; i < this.props.question.choiceList.length; i++) {
            if (this.props.question.choiceList[i].focus) {
                $("#" + this.props.question.choiceList[i].id).focus();
                this.props.question.choiceList[i].focus = false;
            }
        }
    }

    handleQuizQuestionChange(questionText) {
        this.props.handleQuizQuestionChange(questionText, this.props.index)
    }

    handleChoiceTextChange(text, index, cid) {
        var tempChoiceList = this.props.question.choiceList;
        tempChoiceList[index].text = text;
        this.props.setChoiceList(tempChoiceList, this.props.index)
    }

    onQuestionUp(index) {

    }

    onQuestionDown() {
        this.moveFocusDownOrAddNewChoice(-1);
    }

    moveFocusUp(index) {
        if (index !== 0 && this.props.question.choiceList.length) {
            $(`#${this.props.question.choiceList[index - 1].id}`).focus();
        } else {
            $(`#${this.props.question.id}.question-input`).focus();
        }
    }

    moveFocusDownOrAddNewChoice(index) {
        if (index === this.props.question.choiceList.length - 1) {
            this.addNewChoice();
        } else {
            $(`#${this.props.question.choiceList[index + 1].id}`).focus();
        }
    }

    addNewChoice() {
        this.props.addNewChoice(this.props.question.id)
    }

    deleteChoice(choiceId, cindex) {
        this.props.deleteChoice(this.props.question.id, choiceId, this.props.index, cindex)
    }

    makeChoiceIsCorrect(choiceId) {
        this.props.makeChoiceIsCorrect(choiceId, this.props.index)
    }

    deleteQuestion() {
        this.props.deleteQuestion(this.props.question.id, this.props.index)
    }

    render() {
        return (
            <div className="singleQuizForm">
                <QuizQuestion
                    index={this.props.index}
                    invalid={this.props.invalid}
                    onQuestionUp={this.onQuestionUp}
                    onQuestionDown={this.onQuestionDown}
                    questionId={this.props.question.id}
                    questionText={this.props.question.quizQuestionText}
                    handleQuizQuestionChange={this.handleQuizQuestionChange}
                    scrollToQuestion={this.props.scrollToQuestion}
                    deleteQuestion={this.deleteQuestion}/>
                <MCChoiceList 
                    addNewChoice ={this.addNewChoice}
                    handleChoiceTextChange={this.handleChoiceTextChange}
                    choiceList={this.props.question.choiceList}
                    invalidChoice={this.props.invalidChoice}
                    deleteChoice={this.deleteChoice}
                    makeChoiceIsCorrect={this.makeChoiceIsCorrect}
                    moveFocusUp={this.moveFocusUp}
                    moveFocusDownOrAddNewChoice={this.moveFocusDownOrAddNewChoice}/>
                <AddOptionButton handleClick={this.addNewChoice}/>
            </div>
        )
    }
}

export default SingleQuizForm;