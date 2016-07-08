require('css/singlevideo/singlevideoview/QuestionList.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';

import { truncate, pluralize, styleDuration } from 'js/globals/utility';

class QuestionList extends React.Component {
    render() {
        const questions = this.props.questions.map((question) => {
            const responseCount = (question.responses ? question.responses.length : 0);
            return (
              <div
                className={(question.id === this.props.currentQuestion.id ? "selected " : "") + "questionPreview"}
                onClick={this.props.setCurrentQuestion.bind(null, question)}
              >
                  <div className="questionPreviewHeader">
                      {styleDuration(question.time)} {question.topic ? question.topic.name : 'General'}, {responseCount} {pluralize("response", responseCount)}
                  </div>
                  <div className="questionPreviewTitle">
                      {truncate(question.title, 31)}
                  </div>
                  <div className="questionPreviewDescription">
                      {truncate(question.text, 31)}
                  </div>
              </div>
            );
        });

        return (
          <Col md={4} className="questionList">
              { questions }
          </Col>
        );
    }
}

export default QuestionList;