require('css/globals/QuestionAndAnswer/QuestionList.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';

import { truncate, pluralize } from 'js/globals/utility';

class QuestionList extends React.Component {
  render() {
    const unresolvedMarker = (<div className="questionPreviewUnresolved"></div>);
    const questions = this.props.questions.map((question) => {
      const responseCount = (question.responses ? question.responses.length : 0);
      return (
        <div
          className={(question.id === this.props.currentQuestion.id ? 'selected ' : '') + 'questionPreview'}
          onClick={this.props.setCurrentQuestion.bind(null, question)}
        >
          <div className="questionPreviewHeader">
            {question.topic ? question.topic.name : 'General'}, {responseCount} {pluralize('response', responseCount)} {question.resolved ? '' : unresolvedMarker}
          </div>
          <div className="questionPreviewTitle">
            {truncate(question.title, 30)}
          </div>
          <div className="questionPreviewText">
            {truncate(question.text, 38)}
          </div>
        </div>
      );
    });

    return (
      <Col md={4} className="questionList">
        {questions}
      </Col>
    );
  }
}

export default QuestionList;