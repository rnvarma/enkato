require('css/globals/QuestionAndAnswer/QuestionList.scss');

import React, { Component, PropTypes } from 'react';

import Dotdotdot from 'react-dotdotdot';
import moment from 'moment';

import Col from 'react-bootstrap/lib/Col';

import { truncate, pluralize } from 'js/globals/utility';

class QuestionList extends Component {
  render() {
    const unresolvedMarker = (<div className="questionPreviewUnresolved"></div>);

    const questions = this.props.questions.map((question, index) => {
      const responseCount = (question.responses ? question.responses.length : 0);
      question.modified = moment(question.modified);

      let header;
      if (this.props.showingSeries) {
        header = question.video.name;
      } else {
        header = question.topic ? question.topic.name : 'General';
      }
      return (
        <div
            key={index}
          className={(question.id === this.props.currentQuestion.id ? 'selected ' : '') + 'questionPreview'}
          onClick={this.props.setCurrentQuestion.bind(null, question)}
        >
          <div className="questionPreviewHeader">
            <Dotdotdot className="questionPreviewHeaderTopic" clamp={1}>
              {header}
            </Dotdotdot>
            {question.resolved ? '' : unresolvedMarker}
          </div>
          <Dotdotdot className="questionPreviewTitle" clamp={1}>
            {question.title}
          </Dotdotdot>
          <Dotdotdot className="questionPreviewText" clamp={3}>
            {question.text}
          </Dotdotdot>
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

QuestionList.propTypes = {
  showingSeries: PropTypes.bool.isRequired,
};

export default QuestionList;