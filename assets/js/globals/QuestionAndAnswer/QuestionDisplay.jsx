require('css/globals/QuestionAndAnswer/QuestionDisplay.scss');

import React from 'react';

import moment from 'moment';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import getCookie from 'js/globals/GetCookie';
import { styleDuration } from 'js/globals/utility';

import QuestionDisplayResponse from 'js/globals/QuestionAndAnswer/QuestionDisplayResponse';
import QuestionResponseForm from 'js/globals/QuestionAndAnswer/QuestionResponseForm';
import QuestionEditForm from 'js/globals/QuestionAndAnswer/QuestionEditForm';

class QuestionDisplay extends React.Component {
  constructor() {
    super();

    this.delete = this.delete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.postResponse = this.postResponse.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  delete() {
    /* TODO: verify before deleting, error handling on failing to delete */
    $.ajax({
      url: `/api/questions/${this.props.question.id}`,
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
    this.props.toggleEditQuestion(this.props.question.id);
  }

  onSubmit(event) {
    event.preventDefault();
    this.postResponse();
  }

  postResponse() {
    if (this.props.question.responseInput) {
      const data = {
        question_pk: this.props.question.id,
        text: this.props.question.responseInput,
      };

      $.ajax({
        url: '/api/responses',
        dataType: 'json',
        type: 'POST',
        data,
        beforeSend(xhr) {
          xhr.withCredentials = true;
          xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        },
        success: (data) => {
          this.props.pushResponse(this.props.question.id, data);
          this.props.pushResponseText(this.props.question.id, '');
        },
        error: (xhr, status, err) => {
          console.error(status, err.toString());
        },
      });
    }
  }

  onTextChange(event) {
    this.props.pushResponseText(this.props.question.id, event.target.value);
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
          <QuestionDisplayResponse
            key={response.id}
            question={this.props.question}
            response={response}
            pushResponseText={this.props.pushResponseText}
            pushResponseEditText={this.props.pushResponseEditText}
            pushResponseNewText={this.props.pushResponseNewText}
            removeResponse={this.props.removeResponse}
            toggleEndorsedResponse={this.props.toggleEndorsedResponse}
            toggleEditResponse={this.props.toggleEditResponse}
          />
        );
      });
    }
    /* TODO: when receiving data, process dates and other shit like topic */
    const created = moment(this.props.question.created).fromNow();
    const modified = moment(this.props.question.modified).fromNow();
    const topic = this.props.question.topic ? this.props.question.topic : 'General';
    return (
      <Col md={8} className="questionDisplay">
        <Row>
          {this.props.question.editing
            ? (
            <QuestionEditForm
              topicList={this.props.topicList}
              videoUUID={this.props.videoUUID}
              question={this.props.question}
              pushQuestionNewText={this.props.pushQuestionNewText}
              pushQuestionEditText={this.props.pushQuestionEditText}
              toggleEdit={this.toggleEdit}
              delete={this.delete}
            />
          ) : (
            <div className="questionBox">
              <div className="questionHeader">
                {topic}
                {/* TODO: only creator */}<Button onClick={this.toggleEdit}>Edit</Button>
                {/* TODO: only creator/instructor */}<Button onClick={this.delete}>Delete</Button>
              </div>
              <div className="questionTitle">
                {this.props.question.title}
              </div>
              <div className="questionText">
                {this.props.question.text}
              </div>
              <div className="questionFooter">
                <img></img><span className="studentName">{this.props.question.student.first_name} {this.props.question.student.last_name}</span> asked {created}
              </div>
            </div>
          )}
        </Row>
        {responses}
        <Row>
          <QuestionResponseForm
            onSubmit={this.onSubmit}
            onTextChange={this.onTextChange}
            textValue={this.props.question.responseInput}
            key={this.props.question.id}
          />
          <Button onClick={this.onSubmit}>Submit</Button>
        </Row>
      </Col>
    );
  }
}

export default QuestionDisplay;
