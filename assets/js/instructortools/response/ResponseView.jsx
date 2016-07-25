require('bootstrap-loader');
require('css/globals/base.scss');
require('css/instructortools/response/ResponseView.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

class ResponseView extends React.Component {
  constructor() {
    super();

    this.loadQuestionData = this.loadQuestionData.bind(this);
  }

  loadQuestionData(onSuccess) {
    $.ajax({
      url: `/1/series?creator=${this.props.userId}&order_by=responses`,
      dataType: 'json',
      cache: false,
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
      error(xhr, status, error) {
        console.error(status, error.toString());
      },
    });
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