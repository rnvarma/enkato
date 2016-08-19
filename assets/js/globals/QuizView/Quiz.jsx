import React, { Component, PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import request from 'js/globals/HttpRequest';

import QuizQuestion from 'js/globals/QuizView/QuizQuestion';
import QuizReviewQuestion from 'js/globals/QuizView/QuizReviewQuestion';
import QuizNavigation from 'js/globals/QuizView/QuizNavigation';

function countNulls(accumulator, element) {
    return element === null ? accumulator + 1 : accumulator;
}

export default class Quiz extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired,
        displayingQuiz: PropTypes.bool.isRequired,
        closeQuiz: PropTypes.func.isRequired,
        quizResponses: PropTypes.arrayOf(PropTypes.object),
        quizCorrect: PropTypes.number,
        embed: PropTypes.bool,
    }

    state = {
        currentQuestion: 0, /* index */
        currentAnswer: null, /* index */
        answers: new Array(this.props.questions.length).fill(null),
        reviewingQuiz: false,
        quizResponses: this.props.quizResponses,
        quizCorrect: this.props.quizCorrect,
        updated: false,
    }

    componentDidMount() {
        // see http://keycode.info/
        $(document).on('keydown', (e) => {
            if (e.keyCode === 39 || e.keyCode === 78) { // left or p
                e.preventDefault(); // avoid page scroll
                this.nextQuestion();
            } else if (e.keyCode === 37 || e.keyCode === 80) { // right or n
                e.preventDefault();
                this.previousQuestion();
            } else if (e.keyCode === 38) { // up
                e.preventDefault(); // avoid page scroll
                this.previousChoice();
            } else if (e.keyCode === 40) {
                e.preventDefault();
                this.nextChoice();
            } else if (49 <= e.keyCode && e.keyCode <= 57) { // 1-9 keys
                e.preventDefault(); // avoid video time segment jumps
                this.goToChoice(e.keyCode - 49);
            } else if (e.keyCode === 13) { // enter
                e.preventDefault();
                if (this.canSubmit()) {
                    this.submit();
                }
            }
        });
    }

    componentWillUnmount() {
        $(document).off('keydown');
    }

    goToQuestion = (index) => {
        if (0 <= index && index < this.props.questions.length) {
            this.setState({
                currentQuestion: index,
                currentAnswer: this.state.answers[index],
            });
        }
    }

    nextQuestion = () => this.goToQuestion(this.state.currentQuestion + 1);
    previousQuestion = () => this.goToQuestion(this.state.currentQuestion - 1);

    goToChoice = (index) => {
        if (0 <= index && index < this.props.questions[this.state.currentQuestion].choiceList.length) {
            this.setState({
                currentAnswer: index,
                answers: [
                    ...this.state.answers.slice(0, this.state.currentQuestion),
                    index,
                    ...this.state.answers.slice(this.state.currentQuestion + 1),
                ],
                updated: true,
            });
        }
    }

    nextChoice = () =>
        this.goToChoice(this.state.currentAnswer !== null ? this.state.currentAnswer + 1 : 0);
    previousChoice = () =>
        this.goToChoice(this.state.currentAnswer !== null ? this.state.currentAnswer - 1 : this.props.questions[this.state.currentQuestion].choiceList.length - 1);

    closeQuiz = () => {
        /* TODO: maybe do something else here, like warn of losing data */
        this.props.closeQuiz();
    }

    canSubmit = () => this.state.updated && !this.state.reviewingQuiz && this.state.answers.reduce(countNulls, 0) === 0;

    submit = () => {
        request.post(`/logquiz/s/notnecessary/v/${this.props.videoUUID}`, {
            data: {
                selectedAnswers: this.state.answers,
            },
            success: (data) => {
                console.log('successfully posted quiz', data);
                this.setState({
                    quizResponses: data.result,
                    quizCorrect: data.numCorrect,
                    updated: false,
                });
            },
        }, this.props.embed);
    }

    toggleReview = () => this.setState({
        reviewingQuiz: !this.state.reviewingQuiz,
    });

    render() {
        let submitButton;
        if (this.canSubmit()) {
            submitButton = <Button onClick={this.submit}>Submit</Button>;
        }

        console.log('Number CORRECT:', this.state.quizCorrect);

        let question;
        let reviewButtonText;
        if (!this.state.reviewingQuiz) {
            question = (
                <QuizQuestion
                    question={this.props.questions[this.state.currentQuestion]}
                    index={this.state.currentQuestion}
                    goToChoice={this.goToChoice}
                    currentAnswer={this.state.currentAnswer}
                />
            );

            reviewButtonText = 'Review Quiz';
        } else {
            question = (
                <QuizReviewQuestion
                    question={this.props.questions[this.state.currentQuestion]}
                    quizResponse={this.state.quizResponses[this.state.currentQuestion]}
                    index={this.state.currentQuestion}
                />
            );

            reviewButtonText = 'End Review';
        }

        let reviewButton;
        if (this.props.quizResponses) {
            reviewButton = (
                <Button onClick={this.toggleReview}>
                    {reviewButtonText}
                </Button>
            );
        }

        return (
            <Modal show={true || this.props.displayingQuiz} onHide={this.closeQuiz} dialogClassName="quiz">
                <Modal.Header closeButton>Quiz</Modal.Header>
                <Modal.Body>
                    <QuizNavigation
                        questions={this.props.questions}
                        quizResponses={this.props.quizResponses}
                        answers={this.state.answers}
                        currentQuestion={this.state.currentQuestion}
                        reviewingQuiz={this.state.reviewingQuiz}
                        goToQuestion={this.goToQuestion}
                    />
                    {question}
                </Modal.Body>
                <Modal.Footer>
                    {reviewButton}
                    {submitButton}
                    <Button onClick={this.previousQuestion} disabled={this.state.currentQuestion === 0}>
                        Previous
                    </Button>
                    <Button onClick={this.nextQuestion} disabled={this.state.currentQuestion === this.props.questions.length - 1}>
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
