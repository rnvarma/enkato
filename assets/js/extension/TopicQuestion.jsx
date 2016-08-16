import React, { Component, PropTypes } from 'react';

import DotDotDot from 'react-dotdotdot';

export default class TopicQuestion extends Component {
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
            <div className="topicQuestion" onClick={this.onClick}>
                <DotDotDot clamp={2}>
                    <span className="topicQuesitonTitle">{question.title}</span>
                </DotDotDot>
            </div>
        );
    }
}