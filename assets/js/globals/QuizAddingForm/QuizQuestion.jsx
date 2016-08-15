import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

/**
 * Displays a quiz question
 */
export default class QuizQuestion extends Component {
    static propTypes = {
        scrollToQuestion: PropTypes.func.isRequired,
        questionId: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onQuestionUp: PropTypes.func.isRequired,
        onQuestionDown: PropTypes.func.isRequired,
        handleQuizQuestionChange: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
        deleteQuestion: PropTypes.func.isRequired,
        questionText: PropTypes.string.isRequired,
    };
    /**
     * scrolls to this question
     */
    onFocus = () => {
        this.props.scrollToQuestion(this.props.questionId, this.props.index, false);
    }

    /**
     * handles keyboard based question navigation
     * @param {SyntheticEvent} e - the event
     */
    onKeyDown = (e) => {
        if (e.keyCode === 38) { // up
            this.props.onQuestionUp(this.props.index);
        } else if (e.keyCode === 40) { // down
            this.props.onQuestionDown();
        }
    }

    /**
     * handles changes to the question's text
     * @param {SyntheticEvent} e - the event
     */
    handleQuestionTextChange = (e) => {
        this.props.handleQuizQuestionChange(e.target.value);
    }

    render() {
        return (
            <Row className={`question-row ${this.props.invalid ? ' invalid' : ''}`}>
                <FontAwesome
                    className={'arrow-icon arrowIcon'}
                    name={'arrow-right'}
                />
                <input
                    className={`question-input ${this.props.invalid ? ' invalid' : ''}`}
                    id={this.props.questionId}
                    type={'text'}
                    placeholder={`Question ${this.props.index + 1}`}
                    value={this.props.questionText}
                    onKeyDown={this.onKeyDown}
                    onFocus={this.onFocus}
                    onChange={this.handleQuestionTextChange}
                />
                <FontAwesome
                    className={'timesIcon'}
                    name={'times'}
                    onClick={this.props.deleteQuestion}
                />
            </Row>
        );
    }
}
