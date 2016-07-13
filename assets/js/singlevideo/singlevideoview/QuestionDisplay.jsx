require('css/singlevideo/singlevideoview/QuestionDisplay.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.patch = this.patch.bind(this);
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

  onSubmit(event) {
    event.preventDefault();
    this.patch();
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing });
  }
  
  onTitleChange(event) {
    this.props.pushQuestionEditText(this.props.question.id, this.props.question.input.title, event.target.value);
  }
  
  onTextChange(event) {
    this.props.pushQuestionEditText(this.props.question.id, event.target.value, this.props.question.input.text);
  }
  
  patch() {
    /* TODO: error handling on failing to patch */
    const data = {
      title: this.props.question.input.title,
      text: this.props.question.input.text,
    };
    $.ajax({
      url: `/api/videos/${this.props.videoUUID}/questions/${this.props.question.id}`,
      type: 'PATCH',
      data,
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.setState({ editing: false });
        this.props.pushQuestionNewText(this.props.question.id, this.props.question.input.title, this.props.question.input.text);
      },
    });
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
            <div>
              <Form horizontal onSubmit={this.onSubmit}>
                {/* TODO: add topic changer */}
                <FormControl onChange={this.onTitleChange} type="text" value={this.props.question.input.title} />
                <FormControl onChange={this.onTextChange} componentClass="textarea" rows={8} type="text" value={this.props.question.input.text} />
                <Button type="submit">Submit</Button>
              </Form>
              <Button onClick={this.toggleEdit}>Cancel</Button>
              <Button onClick={this.delete}>Delete</Button>
            </div>
            )
            : (
            <div>
              title: {this.props.question.text}
              time: {this.props.question.timestamp}
              <Button onClick={this.toggleEdit}>Edit</Button>
              <Button onClick={this.delete}>Delete</Button>
            </div>
            )
          }
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
