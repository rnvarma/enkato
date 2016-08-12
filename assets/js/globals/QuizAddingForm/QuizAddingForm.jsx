import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

import request from 'js/globals/HttpRequest';
import QuizFormsList from 'js/globals/QuizAddingForm/QuizFormsList';
import ScrollButtonList from 'js/globals/QuizAddingForm/ScrollButtonList';

/**
 * Form for adding a quiz to a video
 */
export default class QuizAddingForm extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        readyToPublish: PropTypes.bool,
        setUnsaved: PropTypes.func.isRequired,
        cancelPublish: PropTypes.func,
        closeAnnotationModal: PropTypes.func,
    }

    /**
     * @type {object}
     * @property {array} questions - the questions of the quiz
     * @property {array} removedQuestions - the questions removed from the quiz in this session
     * @property {array} removedChoices - the choices removed from the quiz in this session
     * @property {object} invalidQuestion - a question that was marked as invalid when the user attempted to submit the quiz
     * @property {object} invalidChoice - a choice that was marked as invalid when the user attempted to submit the quiz
     * @property {number} numQuestions - the number of questions in the quiz
     */
    state = {
        questions: [],
        removedQuestions: [],
        removedChoices: [],
        invalidQuestion: null,
        invalidChoice: null,
        numQuestions: 1,
    };

    componentDidMount() {
        this.loadDataFromServer(this.props.videoUUID);
        /* $(window).on('unload', this.saveDataToServer); TODO: unloadbefore */
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.videoUUID !== nextProps.videoUUID) {
            this.loadDataFromServer(nextProps.videoUUID);
        }

        if (nextProps.readyToPublish) {
            if (this.validateData()) {
                this.saveDataToServer();
                this.props.closeAnnotationModal();
            } else {
                this.props.cancelPublish();
            }
        }
    }

    componentWillUnmount() {
        /* $(window).off('unload'); */
    }

    setChoiceList = (choiceList, questionNumber) => {
        const newQuestions = $.extend(true, [], this.state.questions);

        newQuestions[questionNumber].choiceList = choiceList;

        this.setState({
            questions: newQuestions,
        });

        this.props.setUnsaved();
    }

    /**
     * loads data from server
     * @param {string} vuuid - The uuid of the video to load the data from
     */
    loadDataFromServer = (vuuid) => {
        request.get(`/1/quizdata/${vuuid}`, {
            success: (data) => {
                const response = data;
                if (response.questions.length > 0) {
                    response.questions[0].active = true;
                    this.setState({
                        questions: response.questions,
                    }, () => {
                        $('.quizAddingForm').animate({ scrollTop: 0 }, 400);
                        $(`#${response.questions[0].id}.question-input`).focus();
                    });
                } else { /* add blank question */
                    this.setState({
                        questions: [],
                    });
                    this.addQuestion();
                }
            },
        });
    }

    /**
     * determines whether the quiz is valid to submit
     * @return true if the quiz is valid, false if invalid
     */
    validateData = () => {
        let questionIndex = 0;
        for (const question of this.state.questions) {
            if (!question.quizQuestionText) {
                this.markInvalidInput(question);
                this.scrollToFromButton(question.id, questionIndex);
                return false;
            }

            for (const choice of question.choiceList) {
                if (!choice.text) {
                    this.markInvalidInput(question, choice);
                    this.scrollToFromButton(question.id, questionIndex, true, choice.id);
                    return false;
                }
            }
            questionIndex++;
        }

        return true;
    }

    /**
     * marks a question and optionally a choice as invalid
     * @param {object} question - the question to mark as invalid
     * @param {object} choice - the choice to mark as invalid, defaults to null
     */
    markInvalidInput = (question, choice = null) => {
        this.setState({
            invalidQuestion: question,
            invalidChoice: choice,
        });
    }

    /**
     * saves the quiz to the backend
     */
    saveDataToServer = () => {
        const payload = {
            questions: JSON.stringify(this.state.questions),
            removedQuestions: JSON.stringify(this.state.removedQuestions),
            removedChoices: JSON.stringify(this.state.removedChoices),
        };
        request.post(`/v/${this.props.videoUUID}/updatequiz`, {
            data: payload,
            error: () => {
                console.error('something went wrong');
            },
        });
    }

    /**
     * changes the text of a question
     * @param {string} questionText - the new text of the question
     * @param {number} index - the index of the question to change
     */
    handleQuizQuestionChange = (questionText, index) => {
        const tempQuestionList = this.state.questions;
        tempQuestionList[index].quizQuestionText = questionText;
        this.setState({ questions: tempQuestionList });

        this.props.setUnsaved();
    }

    /**
     * scrolls to a certain question
     * @param {string} questionid - id of the question being scrolled to
     * @param {number} index - the index of the question being scrolled to
     * @param {boolean} refocus - whether or not to refocus
     * @param {string} choiceId - an optional id of a choice to scroll to
     */
    scrollToFromButton = (questionId, index, refocus = true, choiceId = null) => {
        const refocusFunc = () => {
            if (refocus) {
                if (choiceId !== null) {
                    $(`#${choiceId}.choice-input`).focus();
                } else {
                    $(`#${this.state.questions[index].id}.question-input`).focus();
                }
            }
        };
        const distanceToScroll = $(`#${questionId}q`).position().top;
        if (distanceToScroll !== 0) {
            const $quizForm = $('.quizAddingForm'); /* TODO: cache */
            $quizForm.animate({ scrollTop: $quizForm.scrollTop() + distanceToScroll }, 400);

            const questions = $.extend(true, [], this.state.questions);
            for (let i = 0; i < questions.length; i++) {
                questions[i].active = false;
            }
            questions[index].active = true;
            this.setState({
                questions,
            }, refocusFunc);
        } else {
            /* this works because state updates are batched, the problem here
             * is that focus is lost once the cancelPublish changes state */
            this.setState({}, refocusFunc);
        }
    }

    /**
     * makes a choice for a quiz question
     * @param {boolean} isCorrect - whether or not the choice is the correct one, defaults to false
     * @return {object} a new choice
     */
    makeChoice = (isCorrect = false) =>
        ({
            id: `fake_${Date.now()}`,
            text: '',
            is_correct: isCorrect,
            new: true,
        })

    /**
     * adds a new choice to a question
     * @param {string} questionId - the id of the question to add a new choice to
     */
    addNewChoice = (questionId) => {
        const questions = $.extend(true, [], this.state.questions);

        const question = questions.find((q) =>
            questionId === q.id
        );

        const choice = this.makeChoice();
        question.choiceList.push(choice);

        this.setState({
            questions,
        }, () => {
            $(`#${choice.id}`).focus();
        });

        this.props.setUnsaved();
    }

    /**
     * deletes a choice from a question
     * @param {string} questionId - id of the question to delete a choice from
     * @param {string} choiceId - id of the choice to delete
     * @param {number} qIndex - index of the question to delete a choice from
     * @param {number} cIndex - index of the choice to delete
     */
    deleteChoice = (questionId, choiceId, qIndex, cIndex) => {
        const newQuestions = $.extend(true, [], this.state.questions);
        const question = newQuestions.find((q) =>
            q.id === questionId
        );

        if (question.choiceList.length > 1) {
            const newRemovedChoices = [...this.state.removedChoices];

            let needNewAnswer;
            let needNewFocus;
            let choiceIndex;
            const newChoiceList = question.choiceList.filter((choice, index) => {
                if (choice.id !== choiceId) {
                    return true;
                }

                if (!question.new && !choice.new) {
                    newRemovedChoices.push(choice);
                }
                needNewAnswer = choice.is_correct;
                needNewFocus = $(`#${choice.id}.choice-input`).is(':focus');
                choiceIndex = index;

                return false;
            });

            let newChoice;
            if (typeof choiceIndex !== 'undefined') {
                if (choiceIndex > 0) {
                    newChoice = newChoiceList[choiceIndex - 1];
                } else {
                    newChoice = newChoiceList[choiceIndex];
                }
            }

            if (needNewAnswer) {
                newChoice.is_correct = true;
            }
            /* choice.focus might be useless */
            if (needNewFocus) {
                newChoice.focus = true;
            }

            question.choiceList = newChoiceList;

            this.setState({
                questions: newQuestions,
                removedChoices: newRemovedChoices,
            }, () => {
                if (newChoice.focus) {
                    $(`#${newChoice.id}.choice-input`).focus();
                }
            });

            this.props.setUnsaved();
        }
    }

    /**
     * sets a certain choice in a question to be the correct one
     * @param {string} cid - id of the choice to set as the correct error
     * @param {number} qIndex - index of the question the choice belongs to
     */
    makeChoiceIsCorrect = (cid, qIndex) => {
        const tempQuestionList = this.state.questions;
        for (let i = 0; i < tempQuestionList[qIndex].choiceList.length; i++) {
            if (tempQuestionList[qIndex].choiceList[i].id === cid) {
                tempQuestionList[qIndex].choiceList[i].is_correct = true;
            } else {
                tempQuestionList[qIndex].choiceList[i].is_correct = false;
            }
        }
        this.setState({ questions: tempQuestionList });

        this.props.setUnsaved();
    }

    /**
     * adds a question to the quiz
     */
    addQuestion = () => {
        const newQuestion = {
            id: `fake_${Date.now()}`, /* fake ID, not in DB yet */
            quizQuestionText: '',
            new: true,
            currentFocus: 0,
            choiceList: [this.makeChoice(true)],
        };

        const newQuestions = [...this.state.questions, newQuestion];

        this.setState({
            questions: newQuestions,
        }, () => {
            this.scrollToFromButton(newQuestion.id, newQuestions.length - 1);
        });

        this.props.setUnsaved();
    }

    /**
     * deletes a question from the quiz
     * @param {string} questionid - id of the question to delete
     * @param {number} questionIndex - index of the question to delete
     */
    deleteQuestion = (questionId, questionIndex) => {
        const newRemovedQuestion = [...this.state.removedQuestions];
        const newQuestions = this.state.questions.filter((question) => {
            if (question.id !== questionId) {
                return true;
            }

            if (!question.new) {
                newRemovedQuestion.push(question);
            }
            return false;
        });
        this.setState({
            questions: newQuestions,
            removedQuestions: newRemovedQuestion,
        }, () => {
            if (questionIndex !== 0) {
                this.scrollToFromButton(newQuestions[questionIndex - 1].id, questionIndex - 1);
            } else if (newQuestions.length > 0) {
                this.scrollToFromButton(newQuestions[questionIndex].id, questionIndex);
            }
        });

        this.props.setUnsaved();
    }

    render() {
        let height = $('.quizAddingForm').height() - 10;
        if (isNaN(height)) {
            height = 530;
        }
        return (
            <div className="quizAddingForm">
                <div className="questionNumberButtons" style={{ height }}>
                    <ScrollButtonList
                        scrollToFromButton={this.scrollToFromButton}
                        questions={this.state.questions}
                    />
                    <FontAwesome
                        className="addQuestionButton"
                        onClick={this.addQuestion}
                        name="plus"
                    />
                </div>
                <QuizFormsList
                    setChoiceList={this.setChoiceList}
                    handleQuizQuestionChange={this.handleQuizQuestionChange}
                    addNewChoice={this.addNewChoice}
                    deleteChoice={this.deleteChoice}
                    deleteQuestion={this.deleteQuestion}
                    makeChoiceIsCorrect={this.makeChoiceIsCorrect}
                    scrollToQuestion={this.scrollToFromButton}
                    questions={this.state.questions}
                    invalidQuestion={this.state.invalidQuestion}
                    invalidChoice={this.state.invalidChoice}
                />
            </div>
        );
    }
}
