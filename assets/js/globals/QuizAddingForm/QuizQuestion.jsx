import 'css/globals/QuizAddingForm/QuizQuestion.scss';

import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

class QuizQuestion extends Component {
    constructor() {
        super();

        this.onFocus = this.onFocus.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
    }

    onFocus() {
        this.props.scrollToQuestion(this.props.questionId, this.props.index, false);
    }

    onKeyDown(e) {
        if (e.keyCode === 38) { // up
            this.props.onQuestionUp(this.props.index);
        } else if (e.keyCode === 40) { // down
            this.props.onQuestionDown();
        }
    }

    handleQuestionTextChange(e) {
        this.props.handleQuizQuestionChange(e.target.value);
    }

    render() {
        return (
            <Row className={`question-row ${this.props.invalid ? ' invalid' : ''}`}>
                <FontAwesome
                    className={'arrow-icon'}
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

QuizQuestion.propTypes = {
    scrollToQuestion: PropTypes.func,
    questionId: PropTypes.number,
    index: PropTypes.number,
    onQuestionUp: PropTypes.func,
    onQuestionDown: PropTypes.func,
    handleQuizQuestionChange: PropTypes.func,
    invalid: PropTypes.bool,
    deleteQuestion: PropTypes.func,
    questionText: PropTypes.string,
};

export default QuizQuestion;
