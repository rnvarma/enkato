require('css/singlevideo/singlevideoview/QuestionForm.scss');

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import getCookie from 'js/globals/GetCookie';

class QuestionForm extends React.Component {
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
        title: this.state.title,
        text: this.state.text,
      };

      if (this.state.topic && this.state.topic !== 0) {
        data.topic = this.state.topic;
      }

      $.ajax({
        url: `/v/${this.props.videoUUID}/question/add`,
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
      <div className="questionForm">
        <Modal show={this.props.showing} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ask a Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.onSubmit}>
              <FormGroup controlId="Topic">
                <Col componentClass={ControlLabel} sm={3}>
                  Topic
                </Col>
                <Col sm={9}>
                  <FormControl onChange={this.onTopicChange} componentClass="select">
                    <option>General</option>
                    <option value={10}>Actual Topic</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="title">
                <Col componentClass={ControlLabel} sm={3}>
                  Summary
                </Col>
                <Col sm={9}>
                  <FormControl onChange={this.onTitleChange} type="text" />
                </Col>
              </FormGroup>
              <FormGroup controlId="text">
                <Col componentClass={ControlLabel} sm={3}>
                  Description
                </Col>
                <Col sm={9}>
                  <FormControl onChange={this.onTextChange} componentClass="textarea" rows={8} type="text" />
                </Col>
              </FormGroup>
            </Form>
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

export default QuestionForm;
