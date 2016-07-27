import React from 'react';

import Button from 'react-bootstrap/lib/Button';

import request from 'js/globals/HttpRequest';
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
    const payload = {
      title: this.props.question.input.title,
      text: this.props.question.input.text,
      topic_pk: (this.props.question.input.topic === 'General') ? null : this.props.question.input.topic,
    };
    request.patch(`/1/questions/${this.props.question.id}`, {
      data: payload,
      success: (data) => {
        this.props.toggleEdit();
        this.props.replaceQuestion(data.id, data);
      }
    })
  }

  render() {
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
          topicValue={this.props.question.input.topic}/>
        <Button onClick={this.onSubmit}>Publish</Button>
        <Button onClick={this.props.toggleEdit}>Cancel</Button>
        <Button onClick={this.props.delete}>Delete</Button>
      </div>
    );
  }
}

export default QuestionEditForm;
