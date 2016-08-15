import React, { Component, PropTypes } from 'react';

export default class QuestionNode extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        selectQuestion: PropTypes.func.isRequired,
    }

    onClick = () => {
        this.props.selectQuestion(this.props.question);
    }

    render() {
        const { question } = this.props;

        return (
            <div onClick={this.onClick}>
                {question.title} - {question.text}
            </div>
        );
    }
}