import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

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
        const icon = this.props.selected ? 'check-circle-o' : 'circle-o';
        return (
            <div className="quizQuestionChoice" onClick={this.select}>
                <FontAwesome name={icon} />
                <span className="text">{this.props.choice.text}</span>
            </div>
        );
    }
}
