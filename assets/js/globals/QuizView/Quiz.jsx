import React, { Component, PropTypes } from 'react';

export default class Quiz extends Component {
    static propTypes = {
        questions: PropTypes.array.isRequired,
    }

    state = {
        currentQuestion: 0, /* index */
        currentAnswer: 0, /* index */
        answers: new Array(this.props.questions.length).fill(null),
    }

    componentDidMount() {
        // see http://keycode.info/
        $(document).on('keydown', (e) => {
            if (e.keyCode === 39) { // left
                e.preventDefault(); // avoid page scroll
                this.nextQuestion();
            } else if (e.keyCode === 37) {
                e.preventDefault();
                this.previousQuestion();
            } else if (e.keyCode === 38) { // up
                e.preventDefault(); // avoid page scroll
                this.previousChoice();
            } else if (e.keyCode === 40) {
                e.preventDefault();
                this.nextChoice();
            }
        });
    }

    componentWillUnmount() {
        $(document).off('keydown');
    }

    goToQuestion = (index) => {
        if (0 <= index && index < this.props.questions.length) {
            const oldIndex = this.state.currentQuestion;
            this.setState({
                currentQuestion: index,
                currentAnswer: this.state.answers[index] || 0,
                answers: [...this.state.answers.slice(0, oldIndex), this.state.currentAnswer, ...this.state.answers.slice(oldIndex + 1)],
            });
        }
    }

    nextQuestion = () => this.goToQuestion(this.state.currentQuestion + 1);
    previousQuestion = () => this.goToQuestion(this.state.currentQuestion - 1);

    goToChoice = (index) => {
        if (0 <= index && index < this.props.questions[this.state.currentQuestion].choiceList.length) {
            this.setState({
                currentAnswer: index,
            });
        }
    }

    nextChoice = () => this.goToChoice(this.state.currentAnswer + 1);
    previousChoice = () => this.goToChoice(this.state.currentAnswer - 1);

    render() {
        return (
            <div className="quiz">
                currentQuestion (Q{this.state.currentQuestion + 1}: {this.props.questions[this.state.currentQuestion].quizQuestionText} - currentAnswer (C{this.state.currentQuestion + 1}): {this.props.questions[this.state.currentQuestion].choiceList[this.state.currentAnswer].text}
            </div>
        );
    }
}
