import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import moment from 'moment';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row'; 
import Button from 'react-bootstrap/lib/Button';

import auth from 'auth';
import request from 'js/globals/HttpRequest';
import ConfirmModal from 'js/globals/ConfirmModal';
import QuestionDisplayResponse from 'js/globals/QuestionAndAnswer/QuestionDisplayResponse';
import QuestionResponseForm from 'js/globals/QuestionAndAnswer/QuestionResponseForm';
import QuestionEditForm from 'js/globals/QuestionAndAnswer/QuestionEditForm';

import { default as djangoImageLinkHandler } from 'js/globals/DjangoImageLinkHandler';

/**
 * displays a question (may be edited) and its responses
 */
export default class QuestionDisplay extends Component {
    static propTypes = {
        question: PropTypes.shape({
            id: PropTypes.number.isRequired,
            resolved: PropTypes.bool.isRequired,
            responses: PropTypes.arrayOf(PropTypes.object).isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            topic: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
            student: PropTypes.shape({
                id: PropTypes.number.isRequired,
                first_name: PropTypes.string.isRequired,
                last_name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
            }).isRequired,
            video: PropTypes.shape({
                creator: PropTypes.number.isRequired,
            }).isRequired,
            editing: PropTypes.bool.isRequired,
            responseInput: PropTypes.string.isRequired,
            modified: PropTypes.object.isRequired,
            created: PropTypes.object.isRequired,
        }).isRequired,
        videoUUID: PropTypes.string.isRequired,
        currentUser: PropTypes.object.isRequired,
        topicList: PropTypes.arrayOf(PropTypes.object).isRequired,
        pushResponse: PropTypes.func.isRequired,
        pushResponseText: PropTypes.func.isRequired,
        toggleEditQuestion: PropTypes.func.isRequired,
        openRegisterModal: PropTypes.func.isRequired,
        replaceQuestion: PropTypes.func.isRequired,
        removeQuestion: PropTypes.func.isRequired,
        pushResponseEditText: PropTypes.func.isRequired,
        pushResponseNewText: PropTypes.func.isRequired,
        removeResponse: PropTypes.func.isRequired,
        toggleEndorsedResponse: PropTypes.func.isRequired,
        toggleEditResponse: PropTypes.func.isRequired,
        replaceResponse: PropTypes.func.isRequired,
        pushQuestionNewText: PropTypes.func.isRequired,
        pushQuestionEditText: PropTypes.func.isRequired,
    }

    /**
     * constructor
     */
    constructor() {
        super();

        /**
         * @type {object}
         * @property {bool} deleting - whether delete confirm modal is appearing
         */
        this.state = {
            deleting: false,
        };
    }

    /**
     * sends up response input (to be stored with the question in upper state)
     * @param {SytheticEvent} e
     */
    onTextChange = (e) => {
        this.props.pushResponseText(this.props.question.id, e.target.value);
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (auth.loggedIn()) {
            this.postResponse();
        } else {
            this.props.openRegisterModal(() => {
                this.postResponse();
            });
        }
    }

    patchAsResolved = () => {
        const payload = {
            resolved: !this.props.question.resolved,
        };
        request.patch(`/1/questions/${this.props.question.id}`, {
            data: payload,
            success: (data) => {
                this.props.replaceQuestion(data.id, data);
            },
        });
    }

    delete = () => {
        request.delete(`/1/questions/${this.props.question.id}`, {
            success: () => {
                this.props.removeQuestion(this.props.question.id);
                this.toggleDelete();
            },
        });
    }

    toggleEdit = () => {
        this.props.toggleEditQuestion(this.props.question.id);
    }

    toggleDelete = () => {
        this.setState({ deleting: !this.state.deleting });
    }

    postResponse = () => {
        if (this.props.question.responseInput) {
            const payload = {
                question_pk: this.props.question.id,
                text: this.props.question.responseInput,
            };
            request.post('/1/responses', {
                data: payload,
                success: (data) => {
                    this.props.pushResponse(this.props.question.id, data);
                    this.props.pushResponseText(this.props.question.id, '');
                },
            });
        }
    }

    render() {
        if (this.props.question == null) {
            return (
                <Col md={8} className="questionDisplayList">
                    <div className="defaultMessage title">
                        No questions to show
                    </div>
                </Col>
            );
        }

        let responses;
        if (this.props.question.responses) {
            responses = this.props.question.responses.map((response) => (
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
            ));
        }

        const created = moment(this.props.question.created);
        let modified;
        if (!created.isSame(this.props.question.modified)) {
            modified = moment(this.props.question.modified);
        }
        const topic = this.props.question.topic ? this.props.question.topic.name : 'General';

        const isOwner = this.props.currentUser && this.props.currentUser.id === this.props.question.student.id;
        const isInstructor = this.props.currentUser && this.props.currentUser.id === this.props.question.video.creator;
        const resolvedText = this.props.question.resolved ? 'Unresolved' : 'Resolved';
        return (
            <Col md={8} className="questionDisplayList">
                <ConfirmModal
                    showing={this.state.deleting}
                    description="You're deleting this question. Are you sure you want to continue? This is irreversible."
                    acceptText="Delete"
                    acceptBsStyle="danger"
                    acceptCallback={this.delete}
                    cancelCallback={this.toggleDelete}
                />
                <Row className="qaPanel">
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
                            <div className="contentArea">
                                <div className="questionHeader smallTitle">
                                    <span className="questionHeaderTopic">{topic}</span>
                                </div>
                                <div className="questionTitle title">
                                    {this.props.question.title}
                                </div>
                                <div className="questionText">
                                    {this.props.question.text}
                                </div>
                            </div>
                            <div className="questionFooter footer">
                                <Link to={`/userprofile/${this.props.question.student.id}`}>
                                    <img role="presentation" src={djangoImageLinkHandler(this.props.question.student.image || 'blank_avatar.jpg')} />
                                    <span className="studentName">{this.props.question.student.first_name} {this.props.question.student.last_name}</span>
                                </Link> asked {created.fromNow()}{modified ? `, modified ${modified.fromNow()}` : ''}
                                <div className="right">
                                    {isOwner || isInstructor ? <div className="btn-plain" onClick={this.toggleDelete}>Delete</div> : ''}
                                    {isOwner && this.props.videoUUID ? <div className="btn-plain" onClick={this.toggleEdit}>Edit Question</div> : ''}
                                    {isOwner || isInstructor ? <div className="btn-plain" onClick={this.patchAsResolved}>Mark {resolvedText}</div> : ''}
                                </div>
                            </div>
                        </div>
                    )}
                </Row>
                {responses}
                <Row className="qaPanel">
                    <div className="questionEnterResponse contentArea">
                        <QuestionResponseForm
                            onSubmit={this.onSubmit}
                            onTextChange={this.onTextChange}
                            textValue={this.props.question.responseInput}
                            key={this.props.question.id}
                        />
                        <Button className="btn-primary" onClick={this.onSubmit}>Publish</Button>
                    </div>
                </Row>
            </Col>
        );
    }
}
