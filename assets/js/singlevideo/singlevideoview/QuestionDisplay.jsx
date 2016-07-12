require('css/singlevideo/singlevideoview/QuestionDisplay.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import QuestionDisplayResponse from 'js/singlevideo/singlevideoview/QuestionDisplayResponse';
import QuestionResponseForm from 'js/singlevideo/singlevideoview/QuestionResponseForm'

class QuestionDisplay extends React.Component {
  render() {
    if (this.props.question == null) {
      return (
        <Col md={8} className="questionDisplay empty">
          No questions to show
        </Col>
      );
    }

    var responses;
    if (this.props.question.responses) {
      responses = this.props.question.responses.map((response) => {
        return (
          <Row>
            <QuestionDisplayResponse
              key={response.id}
              question={this.props.question}
              response={response}
              videoUUID={this.props.videoUUID}
              pushResponseText={this.props.pushResponseText}
              pushResponseEditText={this.props.pushResponseEditText}
              pushResponseNewText={this.props.pushResponseNewText}
              removeResponse={this.props.removeResponse}
            />
          </Row>
        );
      });
    }

    return (
      <Col md={8} className="questionDisplay">
        <Row>
          title: {this.props.question.text}
          time: {this.props.question.timestamp}
        </Row>
        {responses}
        <Row>
          <QuestionResponseForm
            question={this.props.question}
            pushResponse={this.props.pushResponse}
            pushResponseText={this.props.pushResponseText}
            videoUUID={this.props.videoUUID}
            key={this.props.question.id}
          />
        </Row>
      </Col>
    );
  }
}

export default QuestionDisplay;
