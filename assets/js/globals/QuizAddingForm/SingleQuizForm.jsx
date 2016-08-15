import React, { Component, PropTypes } from 'react';

import QuizQuestion from 'js/globals/QuizAddingForm/QuizQuestion';
import AddOptionButton from 'js/globals/QuizAddingForm/AddOptionButton';
import MCChoiceList from 'js/globals/QuizAddingForm/MCChoiceList';

/**
 * displays a single quiz form
 */
export default class SingleQuizForm extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        invalid: PropTypes.bool.isRequired,
        deleteQuestion: PropTypes.func.isRequired,
        handleQuizQuestionChange: PropTypes.func.isRequired,
        addNewChoice: PropTypes.func.isRequired,
        deleteChoice: PropTypes.func.isRequired,
        makeChoiceIsCorrect: PropTypes.func.isRequired,
        question: PropTypes.shape({
            choiceList: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                focus: PropTypes.bool,
            })).isRequired,
            id: PropTypes.string.isRequired,
            quizQuestionText: PropTypes.string.isRequired,
        }).isRequired,
        scrollToQuestion: PropTypes.func.isRequired,
        invalidChoice: PropTypes.bool,
        setChoiceList: PropTypes.func,
    };
    /**
     * called when the component updated
     */
    componentDidUpdate() {
        for (let i = 0; i < this.props.question.choiceList.length; i++) {
            if (this.props.question.choiceList[i].focus) {
                $(`#${this.props.question.choiceList[i].id}`).focus();
                this.props.question.choiceList[i].focus = false;
            }
        }
    }

    /**
     * handles the user moving up a question (though at the moment this function has a blank body)
     */
    onQuestionUp = () => {

    }

    /**
     * handles the user moving down a question
     */
    onQuestionDown = () => {
        this.moveFocusDownOrAddNewChoice(-1);
    }

    /**
     * handles changing the text of a choice
     * @param {string} text - the new text for the choice
     * @param {number} index - the index of the choice
     */
    handleChoiceTextChange = (text, index) => {
        const tempChoiceList = this.props.question.choiceList;
        tempChoiceList[index].text = text;
        this.props.setChoiceList(tempChoiceList, this.props.index);
    }

    /**
     * handles changing the text of this question
     * @param {string} questionText - the new text for this question
     */
    handleQuizQuestionChange = (questionText) => {
        this.props.handleQuizQuestionChange(questionText, this.props.index);
    }

    /**
     * handles the user moving up a choice
     * @param {number} index - the index of the current choice
     */
    moveFocusUp = (index) => {
        if (index !== 0 && this.props.question.choiceList.length) {
            $(`#${this.props.question.choiceList[index - 1].id}`).focus();
        } else {
            $(`#${this.props.question.id}.question-input`).focus();
        }
    }

    /**
     * handles the user moving down a choice. If the user is at the last choice, then add a new one and move to tempChoiceList
     * @param {number} index - the index of the current choice
     */
    moveFocusDownOrAddNewChoice = (index) => {
        if (index === this.props.question.choiceList.length - 1) {
            this.addNewChoice();
        } else {
            $(`#${this.props.question.choiceList[index + 1].id}`).focus();
        }
    }

    /**
     * adds a new choice to this question
     */
    addNewChoice = () => {
        this.props.addNewChoice(this.props.question.id);
    }

    /**
     * deletes a choice from this question
     * @param {string} choiceId - the id of the choice to remove
     * @param {number} index - the index of the choice to remove
     */
    deleteChoice = (choiceId, cindex) => {
        this.props.deleteChoice(this.props.question.id, choiceId, this.props.index, cindex);
    }

    /**
     * make the given choice the correct one
     * @param {string} choiceId - the id of the choice to make correct
     */
    makeChoiceIsCorrect = (choiceId) => {
        this.props.makeChoiceIsCorrect(choiceId, this.props.index);
    }

    /**
     * deletes this question
     */
    deleteQuestion = () => {
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
