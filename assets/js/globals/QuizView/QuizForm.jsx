import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

import QuestionNode from 'js/globals/QuizView/QuestionNode';
import ReviewingQuizNav from 'js/globals/QuizView/ReviewingQuizView/ReviewingQuizNav';
import CompletedQuizPage from 'js/globals/QuizView/ReviewingQuizView/CompletedQuizPage';
import QuizNav from 'js/globals/QuizView/QuizNav';
import QuizNavFooter from 'js/globals/QuizView/QuizNavFooter';

export default class QuizForm extends Component {
    static propTypes = {
        questions: PropTypes.array.isRequired,
        reviewMode: PropTypes.bool.isRequired,
        resultsPage: PropTypes.bool.isRequired,
        nextVideo: PropTypes.object.isRequired,
        completedQuizInfo: PropTypes.shape({
            result: PropTypes.array.isRequired,
            numCorrect: PropTypes.number.isRequired,
        }).isRequired,
        showResultsPage: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
        submitQuizAnswers: PropTypes.func.isRequired,
        showReviewMode: PropTypes.func.isRequired,
        onRetakeQuiz: PropTypes.func.isRequired,
        onFinishButton: PropTypes.func.isRequired,
    }

    state = {
        currentQuestion: 0,
        selectedAnswers: [],
        numQsAnswered: 0,
    }

    setQuestion = (qNum) => {
        this.setState({
            currentQuestion: qNum,
        });
    }

    setCurrentQuestion = (num) => {
        this.setState({
            currentQuestion: num,
        });
    }

    setNumQsAnswered = () => {
        let count = 0;
        for (let i = this.state.selectedAnswers.length - 1; i >= 0; i--) {
            if (this.state.selectedAnswers[i] != null) {
                count++;
            }
        }
        this.setState({ numQsAnswered: count });
    }

    selectChoice = (choiceIndex) => {
        const tempChoiceList = this.state.selectedAnswers;
        if (choiceIndex === tempChoiceList[this.state.currentQuestion]) {
            tempChoiceList[this.state.currentQuestion] = null;
        } else {
            tempChoiceList[this.state.currentQuestion] = choiceIndex;
        }
        this.setState({ selectedAnswers: tempChoiceList }, this.setNumQsAnswered);
    }

    nextQuestion = () => {
        if (this.state.currentQuestion < this.props.questions.length - 1) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1,
            });
        }
    }

    prevQuestion = () => {
        if (this.state.currentQuestion > 0) {
            this.setState({
                currentQuestion: this.state.currentQuestion - 1,
            });
        } else if (this.props.reviewMode) {
            this.props.showResultsPage();
        }
    }

    closeModal = () => {
        this.props.closeModal();
    }

    submitInfo = () => {
        const payload = {
            selectedAnswers: this.state.selectedAnswers,
        };
        this.props.submitQuizAnswers(payload);
        this.setState({
            currentQuestion: 0,
            selectedAnswers: [],
            numQsAnswered: 0,
        });
        this.props.showResultsPage();
    }

    render() {
        let currentQuestionData = this.props.questions[this.state.currentQuestion];
        let currentQuestionResults = [];
        const isLast = (this.state.currentQuestion === this.props.questions.length - 1);
        let modalBody = <div />;
        let navigation = <div />;

        /* some unused stuff here for some reason, like currentQuestionResults */
        if (this.props.reviewMode) {
            navigation = (
                <ReviewingQuizNav
                    questions={this.props.questions}
                    currentQuestion={this.state.currentQuestion}
                    setQuestion={this.setQuestion}
                    quizResults={this.props.completedQuizInfo.result}
                />
            );
            currentQuestionResults = this.props.completedQuizInfo.result[this.state.currentQuestion];
        } else if (!this.props.resultsPage) {
            navigation = (
                <QuizNav
                    questions={this.props.questions}
                    currentQuestion={this.state.currentQuestion}
                    setQuestion={this.setQuestion}
                />
            );
        }
        if (this.props.questions.length === 0) {
            modalBody = (
                <div className="questionNode noQuiz">
                    The instructor has not created a quiz for this video.
                </div>
            );
        } else if (this.props.resultsPage) {
            modalBody = (
                <CompletedQuizPage
                    closeModal={this.props.closeModal}
                    numCorrect={this.props.completedQuizInfo.numCorrect}
                    numQuestions={this.props.questions.length}
                    showReviewMode={this.props.showReviewMode}
                    nextVideo={this.props.nextVideo}
                    onRetakeQuiz={this.props.onRetakeQuiz}
                />
            );
        } else {
            modalBody = (
                <QuestionNode
                    question={currentQuestionData}
                    selectChoice={this.selectChoice}
                    isLast={isLast}
                    numQsAnswered={this.state.numQsAnswered}
                    numQuestions={this.props.questions.length}
                    selectedAnswer={this.state.selectedAnswers[this.state.currentQuestion]}
                    reviewMode={this.props.reviewMode}
                    currentQuestionResults={currentQuestionResults}
                    setCurrentQuestion={this.setCurrentQuestion}
                />
            );
        }

        return (
            <div className="temp">
                <div className="modal-header">
                    <div className="title-light">Check Your Understanding</div>
                    <FontAwesome className="closeForm" name="close" onClick={this.closeModal} />
                </div>
                <div className="quizForm">
                    {navigation}
                    {modalBody}
                    <QuizNavFooter
                        quizExists={Boolean(this.props.questions[this.state.currentQuestion])}
                        currentQuestion={this.state.currentQuestion}
                        numQuestions={this.props.questions.length}
                        numQsAnswered={this.state.numQsAnswered}
                        nextQuestion={this.nextQuestion}
                        prevQuestion={this.prevQuestion}
                        closeModal={this.closeModal}
                        resultsPage={this.props.resultsPage}
                        reviewMode={this.props.reviewMode}
                        submitInfo={this.submitInfo}
                        showReviewMode={this.props.showReviewMode}
                        onFinishButton={this.props.onFinishButton}
                        submitInfo={this.submitInfo}
                        isCorrect={this.props.completedQuizInfo.result[this.state.currentQuestion] ? this.props.completedQuizInfo.result[this.state.currentQuestion].isCorrect : false}
                    />
                </div>
            </div>
        );
    }
}
