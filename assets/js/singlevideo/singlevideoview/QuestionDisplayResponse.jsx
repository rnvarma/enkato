require('css/singlevideo/singlevideoview/QuestionDisplayResponse.scss');

import React from 'react';

import moment from 'moment';

import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';

import getCookie from 'js/globals/GetCookie';

import QuestionResponseEditForm from 'js/singlevideo/singlevideoview/QuestionResponseEditForm';

class QuestionDisplayResponse extends React.Component {
  constructor() {
    super();

    this.toggleEdit = this.toggleEdit.bind(this);
    this.delete = this.delete.bind(this);
    this.toggleEndorse = this.toggleEndorse.bind(this);
  }

  toggleEdit() {
    this.props.toggleEditResponse(this.props.question.id, this.props.response.id);
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

  toggleEndorse() {
    /* TODO: verify endorsing worked */
    const data = {
      endorsed: !this.props.response.endorsed,
    }
    $.ajax({
      url: `/api/videos/${this.props.videoUUID}/responses/${this.props.response.id}`,
      type: 'PATCH',
      data,
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.props.toggleEndorsedResponse(this.props.question.id, this.props.response.id);
      },
    });
  }

  render() {
    if (this.props.response.editing) {
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

    const badges = (
      <div className="responseBadges">
        {this.props.response.is_instructor ? <div><FontAwesome name="star" className="instructor" />instructor answer</div> : ''}
        {this.props.response.endorsed ? <div><FontAwesome name="check-circle-o" className="endorsed" />instructor endorsed</div> : ''}
      </div>
    );

    const endorseText = (this.props.response.endorsed ? 'Unendorse' : 'Endorse');

    return (
      <Row>
        <div className={(this.props.response.is_instructor ? 'instructor ' : '') + 'questionDisplayResponse'}>
          <div className="responseText">
            {this.props.response.text}
          </div>
          {badges}
          <div className="responseFooter">
            <img></img><span className="studentName">{this.props.response.user.first_name} {this.props.response.user.last_name}</span> asked {created.fromNow()}{modified ? ", modified: "+modified.fromNow() : ""}
            {/* check is user/instructor is logged in */true ? <div onClick={this.delete} className="plainBtn">Delete</div> : '' }
            {/* check if user is logged in */true ? <div onClick={this.toggleEdit} className="plainBtn">Edit Answer</div> : '' }
            {/* check if instructor is logged in and not instructor post */false ? '' : <div onClick={this.toggleEndorse} className="plainBtn">{endorseText}</div>}
          </div>
        </div>
      </Row>
    );
  }
}

export default QuestionDisplayResponse;
