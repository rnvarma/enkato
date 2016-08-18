import React, { Component, PropTypes } from 'react';

export default class QuizQuestionChoice extends Component {
    static propTypes = {
        choice: PropTypes.shape({
            text: PropTypes.string.isRequired,
        }).isRequired,
        selected: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
        goToChoice: PropTypes.func.isRequired,
    }

    select = () => {
        this.props.goToChoice(this.props.index);
    }

    render() {
        return (
            <div className="quizQuestionChoice" onClick={this.select}>
                {this.props.selected ? 'x' : 'o'}: {this.props.choice.text}
            </div>
        );
    }
}
