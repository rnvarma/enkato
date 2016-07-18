require('css/globals/QuestionAndAnswer/QuestionEditForm.scss');

import React from 'react';

import Button from 'react-bootstrap/lib/Button';

import getCookie from 'js/globals/GetCookie';

import QuestionForm from 'js/globals/QuestionAndAnswer/QuestionForm';

class QuestionEditForm extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.patch = this.patch.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.patch();
  }

  onTitleChange(event) {
    this.props.pushQuestionEditText(this.props.question.id, event.target.value, this.props.question.input.text);
  }

  onTextChange(event) {
    this.props.pushQuestionEditText(this.props.question.id, this.props.question.input.title, event.target.value);
  }

  patch() {
    /* TODO: error handling on failing to patch */
    const data = {
      title: this.props.question.input.title,
      text: this.props.question.input.text,
      /* TODO: do the topic */
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
        this.props.toggleEdit();
        this.props.pushQuestionNewText(this.props.question.id, this.props.question.input.title, this.props.question.input.text);
      },
    });
  }

  render() {
    return (
      <div className="questionEditForm">
        <QuestionForm
          topicList={this.props.topicList}
          onSubmit={this.onSubmit}
          onTopicChange={null}
          onTitleChange={this.onTitleChange}
          onTextChange={this.onTextChange}
          titleValue={this.props.question.input.title}
          textValue={this.props.question.input.text}
        />
        <Button onClick={this.onSubmit}>Publish</Button>
        <Button onClick={this.props.toggleEdit}>Cancel</Button>
        <Button onClick={this.props.delete}>Delete</Button>
      </div>
    );
  }
}

export default QuestionEditForm;