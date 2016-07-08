require('css/singlevideo/singlevideoview/QuestionDisplay.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import QuestionDisplayResponse from 'js/singlevideo/singlevideoview/QuestionDisplayResponse';

class QuestionDisplay extends React.Component {
  render() {
    if (this.props.question == null) {
      return (
        <Col md={8} className="questionDisplay empty">
          No questions to show
        </Col>
      );
    }

    var responses = '';
    if (this.props.question.responses) {
      responses = this.props.question.responses.map((response) => {
        return (<QuestionDisplayResponse response={response}/>);
      });
    }
    
    return (
      <Col md={8} className="questionDisplay">
        <Row>
          title: {this.props.question.text}
          time: {this.props.question.timestamp}
        </Row>
        {responses}
      </Col>
    );
  }
}

export default QuestionDisplay;
