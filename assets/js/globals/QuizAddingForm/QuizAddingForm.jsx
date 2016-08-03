require('css/globals/QuizAddingForm/quizaddingform.scss');

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
            numQuestions: 1,
        };

        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.saveDataToServer = this.saveDataToServer.bind(this);
        this.setChoiceList = this.setChoiceList.bind(this);
        this.setShouldRefocus = this.setShouldRefocus.bind(this);
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
        /*$(window).on('unload', this.saveDataToServer); TODO: unloadbefore */
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.videoUUID != nextProps.videoUUID) {
            this.saveDataToServer();
            this.loadDataFromServer(nextProps.videoUUID);
        }

        if (nextProps.publishQuiz) {
            this.saveDataToServer();
            this.props.closeAnnotationModal();
        }
    }

    componentWillUnmount() {
        /*$(window).off('unload');*/
    }

    loadDataFromServer(vuuid) {
        request.get(`/1/quizdata/${vuuid}`, {
            success: (data) => {
                if (data.questions.length > 0) {
                    this.setState({
                        questions: data.questions,
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
        var tempQuestionList = this.state.questions;
        tempQuestionList[questionNumber].choiceList = choiceList;
        this.setState({questions: tempQuestionList})
    }

    setShouldRefocus(shouldRefocus, questionNumber) {
        var tempQuestionList = this.state.questions;
        tempQuestionList[questionNumber - 1].shouldRefocus = shouldRefocus;
        this.setState({questions: tempQuestionList})
    }

    handleQuizQuestionChange(questionText, index) {
        var tempQuestionList = this.state.questions;
        tempQuestionList[index].quizQuestionText = questionText;
        this.setState({questions: tempQuestionList})
    }

    scrollToFromButton(questionId, index) {
        if (!this.state.questions[index].active) {
            const distanceToScroll = $(`#${questionId}q`).position().top;
            const $quizForm = $('.quizAddingForm');
            $quizForm.animate({scrollTop: $quizForm.scrollTop() + distanceToScroll}, 400);

            const questions = $.extend(true, [], this.state.questions);
            for (let i = 0; i < questions.length; i++) {
                questions[i].active = false;
            }
            questions[index].active = true;
            this.setState({
                questions: questions,
            });
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

        this.props.setUnsavedQuiz();
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
                needNewFocus = choice.focus;
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
            if (needNewFocus) {
                newChoice.focus = true; /* TODO: SHIFTING CURRENT FOCUS? */
            }

            question.choiceList = newChoiceList;

            this.setState({
                questions: newQuestions,
                removedChoices: newRemovedChoices,
            });

            this.props.setUnsavedQuiz();
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
            $(`#${newQuestion.id}q .singleQuizForm .question-row .question-input`).focus();
        });

        this.props.setUnsavedQuiz();
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

        this.props.setUnsavedQuiz();
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
                    setShouldRefocus={this.setShouldRefocus}
                    handleQuizQuestionChange={this.handleQuizQuestionChange}
                    addNewChoice={this.addNewChoice}
                    deleteChoice={this.deleteChoice}
                    deleteQuestion={this.deleteQuestion}
                    makeChoiceIsCorrect={this.makeChoiceIsCorrect}
                    scrollToFromButton={this.scrollToFromButton}
                    questions={this.state.questions}/>
            </div>
        )
    }
}

export default QuizAddingForm;
