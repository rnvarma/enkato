import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import request from 'js/globals/HttpRequest';
import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

class ResponseView extends React.Component {
  constructor() {
    super();

    this.loadQuestionData = this.loadQuestionData.bind(this);
  }

  loadQuestionData(onSuccess) {
    request.get(`/1/series?creator=${this.props.userId}&order_by=responses`, {
      success: (data) => {
        let questionData = [];
        data.forEach((series) => {
          series.videos.forEach((video) => {
            video.video.question_set.forEach((question) => {
              questionData.push(question);
            });
          });
        });
        onSuccess(questionData);
      },
    })
  }

  render() {
    return (
      <div className="responseView">
        <Row>
          <Col mdOffset={1} md={10}>
            <QuestionView
              loadQuestionData={this.loadQuestionData}/>
          </Col>
        </Row>
      </div>
    );
  }
}

module.exports = ResponseView