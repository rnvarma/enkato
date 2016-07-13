require('css/singlevideo/singlevideoview/QuestionDisplayResponse.scss');

import React from 'react';

import moment from 'moment';

import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import QuestionResponseEditForm from 'js/singlevideo/singlevideoview/QuestionResponseEditForm';

class QuestionDisplayResponse extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.delete = this.delete.bind(this);
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

  toggleEdit() {
    this.setState({ editing: !this.state.editing });
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

  render() {
    if (this.state.editing) {
      return (
        <Row className="questionDisplayResponse">
          <QuestionResponseEditForm
            videoUUID={this.props.videoUUID}
            question={this.props.question}
            response={this.props.response}
            delete={this.delete}
            toggleEdit={this.toggleEdit}
            removeResponse={this.props.removeResponse}
            pushResponseEditText={this.props.pushResponseEditText}
            pushResponseNewText={this.props.pushResponseNewText}
          />
        </Row>
      );
    }

    const created = moment(this.props.response.created);
    var modified;
    if (!created.isSame(this.props.response.modified)) {
      modified = moment(this.props.response.modified);
    }

    return (
      <Row>
        <div className={(this.props.response.is_instructor ? 'instructor ' : '') + 'questionDisplayResponse'}>
          <div className="responseText">
            {this.props.response.text}
          </div>
          <div className="responseFooter">
            <img></img><span className="studentName">{this.props.response.user.first_name} {this.props.response.user.last_name}</span> asked {created.fromNow()}{modified ? ", modified: "+modified.fromNow() : ""}
            <Button onClick={this.delete}>Delete</Button>
            <Button onClick={this.toggleEdit}>Edit Response</Button>
          </div>
        </div>
      </Row>
    );
  }
}

export default QuestionDisplayResponse;
