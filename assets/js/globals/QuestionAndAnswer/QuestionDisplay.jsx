require('css/globals/QuestionAndAnswer/QuestionDisplay.scss');

import React from 'react';

import moment from 'moment';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import getCookie from 'js/globals/GetCookie';

import DeleteConfirmModal from 'js/globals/DeleteConfirmModal';
import QuestionDisplayResponse from 'js/globals/QuestionAndAnswer/QuestionDisplayResponse';
import QuestionResponseForm from 'js/globals/QuestionAndAnswer/QuestionResponseForm';
import QuestionEditForm from 'js/globals/QuestionAndAnswer/QuestionEditForm';

import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';

class QuestionDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      deleting: false,
    };
    this.delete = this.delete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.patchAsResolved = this.patchAsResolved.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.postResponse = this.postResponse.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(event) {
    this.props.pushResponseText(this.props.question.id, event.target.value);
  }

  onSubmit(event) {
    event.preventDefault();
    this.postResponse();
  }

  patchAsResolved() {
    const payload = {
      resolved: !this.props.question.resolved,
    };
    $.ajax({
      url: `/1/questions/${this.props.question.id}`,
      type: 'PATCH',
      data: payload,
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: (data) => {
        this.props.replaceQuestion(data.id, data);
      },
    });
  }

  delete() {
    /* TODO: verify before deleting, error handling on failing to delete */
    $.ajax({
      url: `/1/questions/${this.props.question.id}`,
      type: 'DELETE',
      beforeSend(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      },
      success: () => {
        this.props.removeQuestion(this.props.question.id);
        this.toggleDelete();
      },
    });
  }

  toggleEdit() {
    this.props.toggleEditQuestion(this.props.question.id);
  }

  toggleDelete() {
    this.setState({ deleting: !this.state.deleting });
  }

  postResponse() {
    if (this.props.question.responseInput) {
      const data = {
        question_pk: this.props.question.id,
        text: this.props.question.responseInput,
      };

      $.ajax({
        url: '/1/responses',
        dataType: 'json',
        type: 'POST',
        data,
        beforeSend(xhr) {
          xhr.withCredentials = true;
          xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        },
        success: (data) => {
          this.props.pushResponse(this.props.question.id, data);
          this.props.pushResponseText(this.props.question.id, '');
        },
        error: (xhr, status, err) => {
          console.error(status, err.toString());
        },
      });
    }
  }

  render() {
    if (this.props.question == null) {
      return (
        <Col md={8} className="questionDisplay empty">
          No questions to show
        </Col>
      );
    }

    var responses;
    if (this.props.question.responses) {
      responses = this.props.question.responses.map((response) => {
        return (
          <QuestionDisplayResponse
            key={response.id}
            question={this.props.question}
            response={response}
            pushResponseText={this.props.pushResponseText}
            pushResponseEditText={this.props.pushResponseEditText}
            pushResponseNewText={this.props.pushResponseNewText}
            removeResponse={this.props.removeResponse}
            toggleEndorsedResponse={this.props.toggleEndorsedResponse}
            toggleEditResponse={this.props.toggleEditResponse}
            currentUser={this.props.currentUser}
            replaceResponse={this.props.replaceResponse}
          />
        );
      });
    }

    const created = moment(this.props.question.created);
    let modified;
    if (!created.isSame(this.props.question.modified)) {
      modified = moment(this.props.question.modified);
    }
    const topic = this.props.question.topic ? this.props.question.topic.name : 'General';

    const isOwner = this.props.currentUser && this.props.currentUser.id === this.props.question.student.id;
    const isInstructor = this.props.currentUser && this.props.currentUser.id === this.props.question.video.creator;
    const resolvedText = this.props.question.resolved ? 'unresolved' : 'resolved';
    return (
      <Col md={8} className="questionDisplay">
        <DeleteConfirmModal
          deleting={this.state.deleting}
          description="You're deleting this question. Are you sure you want to continue? This is irreversible."
          deleteCallback={this.delete}
          cancelCallback={this.toggleDelete}
        />
        <Row>
          {this.props.question.editing
            ? (
            <QuestionEditForm
              topicList={this.props.topicList}
              videoUUID={this.props.videoUUID}
              question={this.props.question}
              pushQuestionNewText={this.props.pushQuestionNewText}
              pushQuestionEditText={this.props.pushQuestionEditText}
              replaceQuestion={this.props.replaceQuestion}
              toggleEdit={this.toggleEdit}
              delete={this.delete}
            />
          ) : (
            <div className="questionBox">
              <div className="questionHeader">
                <span className="questionHeaderTopic">{topic}</span>
                {isOwner || isInstructor ? <Button onClick={this.patchAsResolved}>Mark as {resolvedText}</Button> : ''}
              </div>
              <div className="questionTitle">
                {this.props.question.title}
              </div>
              <div className="questionText">
                {this.props.question.text}
              </div>
              <div className="questionFooter">
                <img src={DjangoImageLinkHandler("blank_avatar.jpg")}></img><span className="studentName">{this.props.question.student.first_name} {this.props.question.student.last_name}</span> asked {created.fromNow()}{modified ? ", modified "+modified.fromNow() : ""}
                {isOwner || isInstructor ? <div className="plainBtn" onClick={this.toggleDelete}>Delete</div> : ''}
                {isOwner && this.props.videoUUID ? <div className="plainBtn" onClick={this.toggleEdit}>Edit Question</div> : ''}
              </div>
            </div>
          )}
        </Row>
        {responses}
        <Row>
          <div className="questionEnterResponse">
            <QuestionResponseForm
              onSubmit={this.onSubmit}
              onTextChange={this.onTextChange}
              textValue={this.props.question.responseInput}
              key={this.props.question.id}
            />
            <Button className="publishResponse" onClick={this.onSubmit}>Publish</Button>
          </div>
        </Row>
      </Col>
    );
  }
}

export default QuestionDisplay;
