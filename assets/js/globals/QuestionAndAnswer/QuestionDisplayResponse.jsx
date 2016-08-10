import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

import djangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';
import request from 'js/globals/HttpRequest';
import ConfirmModal from 'js/globals/ConfirmModal';
import QuestionResponseEditForm from 'js/globals/QuestionAndAnswer/QuestionResponseEditForm';

export default class QuestionDisplayResponse extends Component {
    static propTypes = {
        question: PropTypes.shape({
            id: PropTypes.number.isRequired,
            video: PropTypes.shape({
                creator: PropTypes.number.isRequired,
            }).isRequired,
        }).isRequired,
        response: PropTypes.shape({
            id: PropTypes.number.isRequired,
            endorsed: PropTypes.bool.isRequired,
            editing: PropTypes.bool.isRequired,
            is_instructor: PropTypes.bool.isRequired,
            user: PropTypes.shape({
                id: PropTypes.number.isRequired,
                first_name: PropTypes.string.isRequired,
                last_name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
            }).isRequired,
            modified: PropTypes.object.isRequired,
            created: PropTypes.object.isRequired,
        }).isRequired,
        currentUser: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
        toggleEditResponse: PropTypes.func.isRequired,
        removeResponse: PropTypes.func.isRequired,
        replaceResponse: PropTypes.func.isRequired,
        pushResponseEditText: PropTypes.func.isRequired,
    }

    state = {
        deleting: false,
    }

    toggleDelete = () => {
        this.setState({ deleting: !this.state.deleting });
    }

    toggleEdit = () => {
        this.props.toggleEditResponse(this.props.question.id, this.props.response.id);
    }

    delete = () => {
        /* TODO: verify before deleting, error handling on failing to delete */
        request.delete(`/1/responses/${this.props.response.id}`, {
            success: () => {
                this.props.removeResponse(this.props.question.id, this.props.response.id);
                this.toggleDelete();
            },
        });
    }

    toggleEndorse = () => {
        /* TODO: verify endorsing worked */
        const payload = {
            endorsed: !this.props.response.endorsed,
        };
        request.patch(`/1/responses/${this.props.response.id}`, {
            data: payload,
            success: (data) => {
                this.props.replaceResponse(this.props.question.id, data.id, data);
            },
        });
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
        const { response, currentUser } = this.props;

        const created = moment(response.created);
        let modified;
        if (!created.isSame(response.modified)) {
            modified = moment(response.modified);
        }

        const badges = (
            <div className="responseBadges smallDarkTitle">
                {response.is_instructor ? <div><FontAwesome name="star" className="instructor" />Instructor Answer</div> : ''}
                {response.endorsed ? <div><FontAwesome name="check-circle-o" className="endorsed" />Instructor Endorsed</div> : ''}
            </div>
        );

        const endorseText = (response.endorsed ? 'Unendorse' : 'Endorse');

        const isOwner = currentUser && currentUser.id === response.user.id;
        const isInstructor = currentUser && currentUser.id === this.props.question.video.creator;

        let responseClass;
        if (response.is_instructor) {
            responseClass = 'instructor ';
        } else if (response.endorsed) {
            responseClass = 'endorsed ';
        }
        responseClass += 'response';

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
                <div className={responseClass}>
                    {badges}
                    <div className="responseText contentArea">
                        {response.text}
                    </div>
                    <div className="responseFooter footer">
                        <Link to={`/userprofile/${response.user.id}`}>
                            <img role="presentation" src={djangoImageLinkHandler(response.user.image || 'blank_avatar.jpg')} />
                            <span className="studentName">{response.user.first_name} {response.user.last_name}</span>
                        </Link> answered {created.fromNow()}{modified ? `, modified ${modified.fromNow()}` : ''}
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
