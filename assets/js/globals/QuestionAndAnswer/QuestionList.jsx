require('css/globals/QuestionAndAnswer/QuestionList.scss');

import React from 'react';

import moment from 'moment';

import Col from 'react-bootstrap/lib/Col';

import { truncate, pluralize } from 'js/globals/utility';

class QuestionList extends React.Component {
  render() {
    const unresolvedMarker = (<div className="questionPreviewUnresolved"></div>);
    const questions = this.props.questions.map((question) => {
      const responseCount = (question.responses ? question.responses.length : 0);
      question.modified = moment(question.modified);
      return (
        <div
          className={(question.id === this.props.currentQuestion.id ? 'selected ' : '') + 'questionPreview'}
          onClick={this.props.setCurrentQuestion.bind(null, question)}
        >
          <div className="questionPreviewHeader">
            {question.topic ? question.topic.name : 'General'} {question.resolved ? '' : unresolvedMarker} / {question.video.name}
          </div>
          <div className="questionPreviewTitle">
            {truncate(question.title, 30)}
          </div>
          <div className="questionPreviewText">
            {truncate(question.text, 38)}
          </div>
          <div className="questionPreviewFooter">
            {question.modified.fromNow()} | {responseCount} {pluralize('answer', responseCount)}
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