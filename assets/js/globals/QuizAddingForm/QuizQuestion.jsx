import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

class QuizQuestion extends Component {
    constructor() {
        super();

        this.onFocus = this.onFocus.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
    }

    onFocus(e) {
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
            <Row className={'question-row' + (this.props.invalid ? ' invalid' : '')}>
                <FontAwesome
                    className='arrow-icon'
                    name='arrow-right'/>
                <input
                    className={'question-input' + (this.props.invalid ? ' invalid' : '')}
                    id={this.props.questionId}
                    type="text"
                    placeholder={`Question ${this.props.index+1}`}
                    value={this.props.questionText}
                    onKeyDown={this.onKeyDown}
                    onFocus={this.onFocus}
                    onChange={this.handleQuestionTextChange}/>
                <FontAwesome
                    className="timesIcon"
                    name="times"
                    onClick={this.props.deleteQuestion}/>
            </Row>
        );
    }
}

export default QuizQuestion;