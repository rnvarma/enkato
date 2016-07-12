require('css/singlevideo/singlevideoview/QuestionDisplayResponse.scss');

import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';

import getCookie from 'js/globals/GetCookie';

class QuestionDisplayResponse extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
    };

    this.delete = this.delete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.patch = this.patch.bind(this);
  }

  componentDidMount() {
    /* if you have unique input saved, then you're editing */
    this.setState({
      editing: this.props.response.input !== this.props.response.text,
    });
  }

  componentWillReceiveProps(newProps) {
    /* if you have unique input saved, then you're editing */
    this.setState({
      editing: newProps.response.input !== newProps.response.text,
    });
  }

  delete() {
    /* TODO: verify before deleting, error handling on failing to delete */
    $.ajax({
      url: `/api/videos/${this.props.videoUUID}/responses/${this.props.response.id}`,
      type: 'DELETE',
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.props.removeResponse(this.props.question.id, this.props.response.id);
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

  onTextChange(event) {
    this.props.pushResponseEditText(this.props.question.id, this.props.response.id, event.target.value);
  }

  patch() {
    /* TODO: error handling on failing to patch */
    const data = {
      'text': this.props.response.input,
    };
    $.ajax({
      url: `/api/videos/${this.props.videoUUID}/responses/${this.props.response.id}`,
      type: 'PATCH',
      data,
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.setState({ editing: false });
        this.props.pushResponseNewText(this.props.question.id, this.props.response.id, this.props.response.input);
      },
    });
  }

  render() {
    if (this.state.editing) {
      return (
        <Row className="questionDisplayResponse">
          <Form horizontal onSubmit={this.onSubmit}>
            <FormControl onChange={this.onTextChange} componentClass="textarea" rows={4} type="text" value={this.props.response.input} />
            <Button type="submit">Submit</Button>
          </Form>
          <Button onClick={this.toggleEdit}>Cancel</Button>
          <Button onClick={this.delete}>Delete</Button>
        </Row>
      );
    } else {
      return (
        <Row className="questionDisplayResponse">
          response text: {this.props.response.text}
          <Button onClick={this.toggleEdit}>Edit</Button>
          <Button onClick={this.delete}>Delete</Button>
        </Row>
      );
    }
  }
}

export default QuestionDisplayResponse;
