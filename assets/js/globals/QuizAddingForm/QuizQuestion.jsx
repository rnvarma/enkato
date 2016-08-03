require('css/globals/QuizAddingForm/QuizQuestion.scss');

import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

class QuizQuestion extends Component {
    constructor() {
        super();
        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
    }

    handleQuestionTextChange(e) {
        this.props.handleQuizQuestionChange(e.target.value);
    }

    render() {
        return (
            <Row className="question-row">
                <FontAwesome
                    className='arrow-icon' 
                    name='arrow-right'/>
                <input
                    className="question-input"
                    type="text"
                    placeholder={`Question ${this.props.index+1}`}
                    value={this.props.questionText}
                    onChange={this.handleQuestionTextChange}
                    onFocus={this.props.scrollToQuestion}/>
                <FontAwesome
                    className="timesIcon"
                    name="times"
                    onClick={this.props.deleteQuestion}/>
            </Row>
        );
    }
}

export default QuizQuestion;