require('css/globals/QuestionAndAnswer/QuestionEditForm.scss');

import React from 'react';

import Button from 'react-bootstrap/lib/Button';

import getCookie from 'js/globals/GetCookie';

import QuestionForm from 'js/globals/QuestionAndAnswer/QuestionForm';

class QuestionEditForm extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onTopicChange = this.onTopicChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.patch = this.patch.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.patch();
  }

  onTopicChange(event) {
    this.props.pushQuestionEditText(this.props.question.id, event.target.value, this.props.question.input.title, this.props.question.input.text);
  }

  onTitleChange(event) {
    this.props.pushQuestionEditText(this.props.question.id, this.props.question.input.topic, event.target.value, this.props.question.input.text);
  }

  onTextChange(event) {
    this.props.pushQuestionEditText(this.props.question.id, this.props.question.input.topic, this.props.question.input.title, event.target.value);
  }

  patch() {
    /* TODO: error handling on failing to patch */
    const data = {
      title: this.props.question.input.title,
      text: this.props.question.input.text,
      topic: this.props.question.input.topic.real_id,
    };
    $.ajax({
      url: `/api/questions/${this.props.question.id}`,
      type: 'PATCH',
      data,
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.props.toggleEdit();
        this.props.pushQuestionNewText(this.props.question.id, this.props.question.input.topic, this.props.question.input.title, this.props.question.input.text);
      },
    });
  }

  render() {
    console.log(this.props.question.input);
    return (
      <div className="questionEditForm">
        <QuestionForm
          topicList={this.props.topicList}
          onSubmit={this.onSubmit}
          onTopicChange={this.onTopicChange}
          onTitleChange={this.onTitleChange}
          onTextChange={this.onTextChange}
          titleValue={this.props.question.input.title}
          textValue={this.props.question.input.text}
          topicValue={this.props.question.input.topic}
        />
        <Button onClick={this.onSubmit}>Publish</Button>
        <Button onClick={this.props.toggleEdit}>Cancel</Button>
        <Button onClick={this.props.delete}>Delete</Button>
      </div>
    );
  }
}

export default QuestionEditForm;
