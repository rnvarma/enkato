require('css/globals/QuestionAndAnswer/QuestionModal.scss');

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import FormControl from 'react-bootstrap/lib/FormControl';

import getCookie from 'js/globals/GetCookie';

import QuestionForm from 'js/globals/QuestionAndAnswer/QuestionForm';

class QuestionModal extends React.Component {
  constructor() {
    super()
    this.state = {
      topic: null,
      title: '',
      text: '',
      generalError: '',
      titleError: '',
      textError: '',
    };

    this.attachFile = this.attachFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.onTopicChange = this.onTopicChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.close = this.close.bind(this);
  }

  attachFile(event) {
    console.log("FILE", event.target.files[0]);
  }

  onSubmit(event) {
    event.preventDefault();
    this.postQuestion();
  }

  postQuestion() {
    if (this.state.title && this.state.text) {
      const data = {
        video_uuid: this.props.videoUUID,
        title: this.state.title,
        text: this.state.text,
        time: this.props.getCurrentTime(),
      };

      if (this.state.topic && this.state.topic !== 0) {
        data.topic = this.state.topic;
      }

      $.ajax({
        url: '/api/questions',
        dataType: 'json',
        type: 'POST',
        data,
        beforeSend: (xhr) => {
          xhr.withCredentials = true;
          xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        },
        success: (newQuestion) => {
          this.props.pushQuestion(newQuestion);
          this.props.close();
          this.setState({
            title: '',
            text: '',
            topic: '',
          })
        },
        error: (xhr, status, err) => {
          console.log('POST failed, could be invalid data or just general server problems', status, err);
        },
      });
    }
  }

  onTopicChange(event) {
    this.setState({ topic: event.target.value });
  }

  onTitleChange(event) {
    // TODO: validation
    this.setState({ title: event.target.value });
  }

  onTextChange(event) {
    // TODO: validation
    this.setState({ text: event.target.value });
  }

  close() {
    this.setState({
      text: '',
      title: '',
      topic: null,
    });
    this.props.close();
  }

  render() {
    return (
      <div className="questionModal">
        <Modal show={this.props.showing} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ask a Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QuestionForm
              topicList={this.props.topicList}
              onSubmit={this.onSubmit}
              onTopicChange={this.onTopicChange}
              onTitleChange={this.onTitleChange}
              onTextChange={this.onTextChange}
              titleValue={this.state.title}
              textValue={this.state.text}
            />
          </Modal.Body>
          <Modal.Footer>
            <FormControl className="pull-left" type="file" onChange={this.attachFile} />
            <Button onClick={this.close}>Cancel</Button>
            <Button onClick={this.postQuestion}>Publish</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default QuestionModal;
