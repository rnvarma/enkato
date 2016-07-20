require('css/globals/QuestionAndAnswer/QuestionDisplayResponse.scss');

import React from 'react';

import moment from 'moment';

import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';

import getCookie from 'js/globals/GetCookie';

import DeleteConfirmModal from 'js/globals/DeleteConfirmModal';
import QuestionResponseEditForm from 'js/globals/QuestionAndAnswer/QuestionResponseEditForm';

class QuestionDisplayResponse extends React.Component {
  constructor() {
    super();
    this.state = {
      deleting: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.toggleEndorse = this.toggleEndorse.bind(this);
  }

  toggleDelete() {
    this.setState({ deleting: !this.state.deleting });
  }

  toggleEdit() {
    this.props.toggleEditResponse(this.props.question.id, this.props.response.id);
  }

  delete() {
    /* TODO: verify before deleting, error handling on failing to delete */
    $.ajax({
      url: `/api/responses/${this.props.response.id}`,
      type: 'DELETE',
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.props.removeResponse(this.props.question.id, this.props.response.id);
        this.toggleDelete();
      },
    });
  }

  toggleEndorse() {
    /* TODO: verify endorsing worked */
    const data = {
      endorsed: !this.props.response.endorsed,
    }
    $.ajax({
      url: `/api/responses/${this.props.response.id}`,
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
        <DeleteConfirmModal
          deleting={this.state.deleting}
          description="You're deleting this response. Are you sure you want to continue? This is irreversible."
          deleteCallback={this.delete}
          cancelCallback={this.toggleDelete}
        />
        <div className={(this.props.response.is_instructor ? 'instructor ' : '') + 'questionDisplayResponse'}>
          <div className="responseText">
            {this.props.response.text}
          </div>
          {badges}
          <div className="responseFooter">
            <img></img><span className="studentName">{this.props.response.user.first_name} {this.props.response.user.last_name}</span> answered {created.fromNow()}{modified ? ", modified: "+modified.fromNow() : ""}
            {/* TODO: check is user/instructor is logged in */true ? <div onClick={this.toggleDelete} className="plainBtn">Delete</div> : '' }
            {/* TODO: check if user is logged in */true ? <div onClick={this.toggleEdit} className="plainBtn">Edit Answer</div> : '' }
            {/* TODO: check if instructor is logged in and not instructor post */false ? '' : <div onClick={this.toggleEndorse} className="plainBtn">{endorseText}</div>}
          </div>
        </div>
      </Row>
    );
  }
}

export default QuestionDisplayResponse;
