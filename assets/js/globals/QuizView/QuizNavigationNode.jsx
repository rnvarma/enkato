import React, { Component, PropTypes } from 'react';

export default class QuizNavigationNode extends Component {
    static propTypes = {
        result: PropTypes.shape({
            student_answer: PropTypes.number.isRequired,
            correct_answer: PropTypes.number.isRequired,
        }),
        index: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        answered: PropTypes.bool,
        reviewingQuiz: PropTypes.bool.isRequired,
        goToQuestion: PropTypes.func.isRequired,
    }

    select = () => this.props.goToQuestion(this.props.index);

    render() {
        const { result, selected, answered, index, reviewingQuiz } = this.props;

        let nodeStyle = '';
        if (reviewingQuiz) {
            nodeStyle = result.correct_answer === result.student_answer ? ' correct' : ' incorrect';
        } else {
            nodeStyle = answered ? ' answered' : ' unanswered';
        }
        nodeStyle += selected ? ' selected' : '';

        return (
            <div className={`quizNavigationNode${nodeStyle}`} onClick={this.select}>
                {index + 1}
            </div>
        );
    }
}
