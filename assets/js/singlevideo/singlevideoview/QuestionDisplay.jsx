require('css/singlevideo/singlevideoview/QuestionDisplay.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import getCookie from 'js/globals/GetCookie';

import QuestionDisplayResponse from 'js/singlevideo/singlevideoview/QuestionDisplayResponse';
import QuestionResponseForm from 'js/singlevideo/singlevideoview/QuestionResponseForm';
import QuestionEditForm from 'js/singlevideo/singlevideoview/QuestionEditForm';

class QuestionDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
    };
    this.delete = this.delete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  delete() {
    /* TODO: verify before deleting, error handling on failing to delete */
    $.ajax({
      url: `/api/videos/${this.props.videoUUID}/questions/${this.props.question.id}`,
      type: 'DELETE',
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.props.removeQuestion(this.props.question.id);
      },
    });
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing });
  }

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
          {this.state.editing
            ? (
            <QuestionEditForm
              videoUUID={this.props.videoUUID}
              question={this.props.question}
              pushQuestionNewText={this.props.pushQuestionNewText}
              pushQuestionEditText={this.props.pushQuestionEditText}
              toggleEdit={this.toggleEdit}
              delete={this.delete}
            />
          ) : (
            <div>
              title: {this.props.question.text}
              time: {this.props.question.timestamp}
              <Button onClick={this.toggleEdit}>Edit</Button>
              <Button onClick={this.delete}>Delete</Button>
            </div>
          )}
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
