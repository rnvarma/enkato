import React, { Component, PropTypes } from 'react';

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
        for (let i = 0; i < this.props.question.choiceList.length; i++) {
            if (this.props.question.choiceList[i].focus) {
                $(`#${this.props.question.choiceList[i].id}`).focus();
                this.props.question.choiceList[i].focus = false;
            }
        }
    }

    onQuestionUp() {

    }

    onQuestionDown() {
        this.moveFocusDownOrAddNewChoice(-1);
    }

    handleChoiceTextChange(text, index) {
        const tempChoiceList = this.props.question.choiceList;
        tempChoiceList[index].text = text;
        this.props.setChoiceList(tempChoiceList, this.props.index);
    }

    handleQuizQuestionChange(questionText) {
        this.props.handleQuizQuestionChange(questionText, this.props.index);
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
        this.props.addNewChoice(this.props.question.id);
    }

    deleteChoice(choiceId, cindex) {
        this.props.deleteChoice(this.props.question.id, choiceId, this.props.index, cindex);
    }

    makeChoiceIsCorrect(choiceId) {
        this.props.makeChoiceIsCorrect(choiceId, this.props.index);
    }

    deleteQuestion() {
        this.props.deleteQuestion(this.props.question.id, this.props.index);
    }

    render() {
        return (
            <div className={'quizFormNode'} id={`${this.props.question.id}q`}>
                <div className={'singleQuizForm'}>
                    <QuizQuestion
                        index={this.props.index}
                        invalid={this.props.invalid}
                        onQuestionUp={this.onQuestionUp}
                        onQuestionDown={this.onQuestionDown}
                        questionId={this.props.question.id}
                        questionText={this.props.question.quizQuestionText}
                        handleQuizQuestionChange={this.handleQuizQuestionChange}
                        scrollToQuestion={this.props.scrollToQuestion}
                        deleteQuestion={this.deleteQuestion}
                    />
                    <MCChoiceList
                        addNewChoice={this.addNewChoice}
                        handleChoiceTextChange={this.handleChoiceTextChange}
                        choiceList={this.props.question.choiceList}
                        invalidChoice={this.props.invalidChoice}
                        deleteChoice={this.deleteChoice}
                        makeChoiceIsCorrect={this.makeChoiceIsCorrect}
                        moveFocusUp={this.moveFocusUp}
                        moveFocusDownOrAddNewChoice={this.moveFocusDownOrAddNewChoice}
                    />
                    <AddOptionButton handleClick={this.addNewChoice} />
                </div>
            </div>
        );
    }
}

SingleQuizForm.propTypes = {
    index: PropTypes.number,
    invalid: PropTypes.bool,
    questionId: PropTypes.number,
    questionText: PropTypes.string,
    deleteQuestion: PropTypes.func,
    handleChoiceTextChange: PropTypes.func,
    handleQuizQuestionChange: PropTypes.func,
    addNewChoice: PropTypes.func,
    deleteChoice: PropTypes.func,
    makeChoiceIsCorrect: PropTypes.func,
    moveFocusUp: PropTypes.func,
    moveFocusDownOrAddNewChoice: PropTypes.func,
    question: PropTypes.shape({
        choiceList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            focus: PropTypes.bool,
        })),
        id: PropTypes.number,
        quizQuestionText: PropTypes.string,
    }),
    scrollToQuestion: PropTypes.func,
    invalidChoice: PropTypes.bool,
    setChoiceList: PropTypes.func,
};

export default SingleQuizForm;
