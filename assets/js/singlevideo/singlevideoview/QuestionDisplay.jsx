require('css/singlevideo/singlevideoview/QuestionDisplay.scss');

import React from 'react';

import moment from 'moment';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import getCookie from 'js/globals/GetCookie';
import { styleDuration } from 'js/globals/utility';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    /* if you have unique input saved, then you're editing */
    this.setState({ /* TODO: CHECK TOPIC CHANGE */
      editing: this.props.question && (this.props.question.input.title !== this.props.question.title || this.props.question.input.text !== this.props.question.text),
    });
  }

  componentWillReceiveProps(newProps) {
    /* if you have unique input saved, then you're editing */
    this.setState({ /* TODO: CHECK TOPIC CHANGE */
      editing: newProps.question.input.title !== newProps.question.title || newProps.question.input.text !== newProps.question.text,
    });
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

  onSubmit(event) {
    event.preventDefault();
    if (this.props.question.responseInput) {
      const data = {
        text: this.props.question.responseInput,
        question: this.props.question.id,
      };

      $.ajax({
        url: `/api/videos/${this.props.videoUUID}/responses`,
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
            videoUUID={this.props.videoUUID}
            pushResponseText={this.props.pushResponseText}
            pushResponseEditText={this.props.pushResponseEditText}
            pushResponseNewText={this.props.pushResponseNewText}
            removeResponse={this.props.removeResponse}
            toggleEndorsedResponse={this.props.toggleEndorsedResponse}
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
            <div className="questionBox">
              <div className="questionHeader">
                {styleDuration(this.props.question.time)} {topic}
                <Button onClick={this.toggleEdit}>Edit</Button>
                <Button onClick={this.delete}>Delete</Button>
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
