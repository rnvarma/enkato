import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

import request from 'js/globals/HttpRequest';
import QuizFormsList from 'js/globals/QuizAddingForm/QuizFormsList';
import ScrollButtonList from 'js/globals/QuizAddingForm/ScrollButtonList';

/*
 * takes in a JSON object with questions
 * returns a list of those questions
 * param: {0: "one", 1: "two", 2: "three"}
 * result: ["one, "two", "three"]
*/
function listify(dict){
  var arr = $.map(dict, function(el) { return el });
  return arr;
}

class QuizAddingForm extends Component {
    constructor() {
        super();

        this.state = {
            questions: [],
            removedQuestions: [],
            removedChoices: [],
            invalidQuestion: null,
            invalidChoice: null,
            numQuestions: 1,
        };

        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.validateData = this.validateData.bind(this);
        this.markInvalidInput = this.markInvalidInput.bind(this);
        this.saveDataToServer = this.saveDataToServer.bind(this);
        this.setChoiceList = this.setChoiceList.bind(this);
        this.handleQuizQuestionChange = this.handleQuizQuestionChange.bind(this);
        this.scrollToFromButton = this.scrollToFromButton.bind(this);
        this.addNewChoice = this.addNewChoice.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.makeChoiceIsCorrect = this.makeChoiceIsCorrect.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
    }

    componentDidMount() {
        this.loadDataFromServer(this.props.videoUUID);
        this.props.setOnConfirmSave(() => {
            if (this.validateData()) {
                this.saveDataToServer();
                return true;
            } else {
                this.props.cancelSave();
                return false;
            }
        });
        /*$(window).on('unload', this.saveDataToServer); TODO: unloadbefore */
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.videoUUID != nextProps.videoUUID) {
            this.loadDataFromServer(nextProps.videoUUID);
        }
    }

    componentWillUnmount() {
        /*$(window).off('unload');*/
    }

    loadDataFromServer(vuuid) {
        request.get(`/1/quizdata/${vuuid}`, {
            success: (data) => {
                if (data.questions.length > 0) {
                    data.questions[0].active = true;
                    this.setState({
                        questions: data.questions,
                    }, () => {
                        $('.quizAddingForm').animate({scrollTop: 0}, 400);
                        $(`#${data.questions[0].id}.question-input`).focus();
                    });
                } else { /* add blank question */
                    this.setState({
                        questions: [],
                    });
                    this.addQuestion();
                }
            }
        });
    }

    validateData() {
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

    markInvalidInput(question, choice = null) {
        this.setState({
                invalidQuestion: question,
                invalidChoice: choice,
        });
    }

    saveDataToServer() {
        const payload = {
            questions: JSON.stringify(this.state.questions),
            removedQuestions: JSON.stringify(this.state.removedQuestions),
            removedChoices: JSON.stringify(this.state.removedChoices),
        };
        request.post(`/v/${this.props.videoUUID}/updatequiz`, {
            data: payload,
            error: () => {
                console.error('something went wrong');
            }
        });
    }

    setChoiceList(choiceList, questionNumber) {
        const newQuestions = $.extend(true, [], this.state.questions);

        newQuestions[questionNumber].choiceList = choiceList;

        this.setState({
            questions: newQuestions,
        });

        this.props.setUnsaved();
    }

    handleQuizQuestionChange(questionText, index) {
        var tempQuestionList = this.state.questions;
        tempQuestionList[index].quizQuestionText = questionText;
        this.setState({questions: tempQuestionList})

        this.props.setUnsaved();
    }

    scrollToFromButton(questionId, index, refocus = true, choiceId = null) {
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
            $quizForm.animate({scrollTop: $quizForm.scrollTop() + distanceToScroll}, 400);

            let questions = $.extend(true, [], this.state.questions);
            for (let i = 0; i < questions.length; i++) {
                questions[i].active = false;
            }
            questions[index].active = true;
            this.setState({
                questions: questions,
            }, refocusFunc);
        } else {
            /* this works because state updates are batched, the problem here
             * is that focus is lost once the cancelPublish changes state */
            this.setState({}, refocusFunc);
        }
    }

    makeChoice(isCorrect = false) {
        return {
            id: `fake_${Date.now()}`,
            text: '',
            is_correct: isCorrect,
            new: true,
        }
    }

    addNewChoice(questionId) {
        const questions = $.extend(true, [], this.state.questions);

        const question = questions.find(question => {
            return questionId === question.id;
        });

        const choice = this.makeChoice();
        question.choiceList.push(choice);

        this.setState({
            questions: questions,
        }, () => {
            $(`#${choice.id}`).focus();
        });

        this.props.setUnsaved();
    }

    deleteChoice(questionId, choiceId, qIndex, cIndex) {
        const newQuestions = $.extend(true, [], this.state.questions);
        const question = newQuestions.find((question) => {
            return question.id === questionId;
        });

        if (question.choiceList.length > 1) {
            const newRemovedChoices = [...this.state.removedChoices];

            let needNewAnswer, needNewFocus;
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
            }, function() {
                if (newChoice.focus) {
                    $(`#${newChoice.id}.choice-input`).focus();
                }
            });

            this.props.setUnsaved();
        }
    }

    makeChoiceIsCorrect(cid, qIndex) {
        var tempQuestionList = this.state.questions;
        for (var i = 0; i < tempQuestionList[qIndex].choiceList.length; i++) {
            if (tempQuestionList[qIndex].choiceList[i].id == cid) {
                tempQuestionList[qIndex].choiceList[i].is_correct = true;
            } else {
                tempQuestionList[qIndex].choiceList[i].is_correct = false;
            }
        }
        this.setState({questions: tempQuestionList})

        this.props.setUnsaved();
    }

    addQuestion() {
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

    deleteQuestion(questionId, questionIndex) {
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
                <div className="questionNumberButtons" style={{height}}>
                    <ScrollButtonList 
                        scrollToFromButton={this.scrollToFromButton}
                        questions={this.state.questions}/>
                    <FontAwesome
                        className="addQuestionButton"
                        onClick={this.addQuestion}
                        name='plus'/>
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
                    invalidChoice={this.state.invalidChoice}/>
            </div>
        )
    }
}

export default QuizAddingForm;
