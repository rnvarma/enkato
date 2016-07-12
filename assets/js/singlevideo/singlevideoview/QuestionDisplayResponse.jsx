require('css/singlevideo/singlevideoview/QuestionDisplayResponse.scss');

import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import getCookie from 'js/globals/GetCookie';

class QuestionDisplayResponse extends React.Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  delete() {
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
    return (
      <Row className="questionDisplayResponse">
        response text: {this.props.response.text}
        <Button onClick={this.delete}>Delete</Button>
      </Row>
    );
  }
}

export default QuestionDisplayResponse;
