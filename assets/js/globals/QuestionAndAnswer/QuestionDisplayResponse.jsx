import React, { Component } from 'react';
import { Link } from 'react-router';

import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

import djangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';
import request from 'js/globals/HttpRequest';
import ConfirmModal from 'js/globals/ConfirmModal';
import QuestionResponseEditForm from 'js/globals/QuestionAndAnswer/QuestionResponseEditForm';

export default class QuestionDisplayResponse extends Component {
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
        request.delete(`/1/responses/${this.props.response.id}`, {
          success: () => {
            this.props.removeResponse(this.props.question.id, this.props.response.id);
            this.toggleDelete();
          }
        })
      }

      toggleEndorse() {
        /* TODO: verify endorsing worked */
        const payload = {
          endorsed: !this.props.response.endorsed,
        }
        request.patch(`/1/responses/${this.props.response.id}`, {
          data: payload,
          success: (data) => {
            this.props.replaceResponse(this.props.question.id, data.id, data);
          }
        })
      }

      render() {
        if (this.props.response.editing) {
          return (
            <Row className="questionDisplayResponse qaPanel">
              <QuestionResponseEditForm
                question={this.props.question}
                response={this.props.response}
                delete={this.delete}
                toggleEdit={this.toggleEdit}
                removeResponse={this.props.removeResponse}
                pushResponseEditText={this.props.pushResponseEditText}
                replaceResponse={this.props.replaceResponse}
              />
            </Row>
          );
        }

        const created = moment(this.props.response.created);
        let modified;
        if (!created.isSame(this.props.response.modified)) {
          modified = moment(this.props.response.modified);
        }

        const badges = (
          <div className="responseBadges smallDarkTitle">
            {this.props.response.is_instructor ? <div><FontAwesome name="star" className="instructor" />Instructor Answer</div> : ''}
            {this.props.response.endorsed ? <div><FontAwesome name="check-circle-o" className="endorsed" />Instructor Endorsed</div> : ''}
          </div>
        );

        const endorseText = (this.props.response.endorsed ? 'Unendorse' : 'Endorse');

        const isOwner = this.props.currentUser && this.props.currentUser.id === this.props.response.user.id;
        const isInstructor = this.props.currentUser && this.props.currentUser.id === this.props.question.video.creator;

        return (
          <Row className="qaPanel">
            <ConfirmModal
              showing={this.state.deleting}
              description="You're deleting this response. Are you sure you want to continue? This is irreversible."
              acceptText="Delete"
              acceptBsStyle="danger"
              acceptCallback={this.delete}
              cancelCallback={this.toggleDelete}
            />
            <div className={(this.props.response.is_instructor ? 'instructor ' : this.props.response.endorsed ? 'endorsed ' : '') + 'response'}>
              {badges}
              <div className="responseText contentArea">
                {this.props.response.text}
              </div>
              <div className="responseFooter footer">
                <Link to={`/userprofile/${this.props.response.user.id}`}><img src={djangoImageLinkHandler(this.props.response.user.image || 'blank_avatar.jpg')}></img>
                <span className="studentName">{this.props.response.user.first_name} {this.props.response.user.last_name}</span></Link> answered {created.fromNow()}{modified ? ", modified "+modified.fromNow() : ""}
                <div className="right">
                  {isOwner || isInstructor ? <div onClick={this.toggleDelete} className="btn-plain">Delete</div> : '' }
                  {isOwner ? <div onClick={this.toggleEdit} className="btn-plain">Edit Answer</div> : '' }
                  {!isOwner && isInstructor ? <div onClick={this.toggleEndorse} className="btn-plain">{endorseText}</div> : ''}
                </div>
              </div>
            </div>
          </Row>
        );
      }
    }
