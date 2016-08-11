import React, { Component, PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';

import request from 'js/globals/HttpRequest';
import QuestionForm from 'js/globals/QuestionAndAnswer/QuestionForm';

export default class QuestionEditForm extends Component {
    static propTypes = {
        question: PropTypes.shape({
            id: PropTypes.number.isRequired,
            input: PropTypes.shape({
                title: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                topic: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        topicList: PropTypes.array.isRequired,
        pushQuestionEditText: PropTypes.func.isRequired,
        replaceQuestion: PropTypes.func.isRequired,
        toggleEdit: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
        embed: PropTypes.bool,
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.patch();
    }

    onTopicChange = (e) => {
        this.props.pushQuestionEditText(this.props.question.id, e.target.value, this.props.question.input.title, this.props.question.input.text);
    }

    onTitleChange = (e) => {
        this.props.pushQuestionEditText(this.props.question.id, this.props.question.input.topic, e.target.value, this.props.question.input.text);
    }

    onTextChange = (e) => {
        this.props.pushQuestionEditText(this.props.question.id, this.props.question.input.topic, this.props.question.input.title, e.target.value);
    }

    patch = () => {
    /* TODO: error handling on failing to patch */
        const payload = {
            title: this.props.question.input.title,
            text: this.props.question.input.text,
            topic_pk: (this.props.question.input.topic === 'General') ? null : this.props.question.input.topic,
        };
        request.patch(`/1/questions/${this.props.question.id}`, {
            data: payload,
            success: (data) => {
                this.props.toggleEdit();
                this.props.replaceQuestion(data.id, data);
            },
        }, this.props.embed);
    }

    render() {
        return (
            <div className="questionEditForm contentArea">
                <QuestionForm
                    topicList={this.props.topicList}
                    onSubmit={this.onSubmit}
                    onTopicChange={this.onTopicChange}
                    onTitleChange={this.onTitleChange}
                    onTextChange={this.onTextChange}
                    titleValue={this.props.question.input.title}
                    textValue={this.props.question.input.text}
                    topicValue={this.props.question.input.topic}
                />
                <Button className="btn-primary" onClick={this.onSubmit}>Publish</Button>
                <Button className="btn-secondary" onClick={this.props.toggleEdit}>Cancel</Button>
                <Button className="btn-secondary" onClick={this.props.delete}>Delete</Button>
            </div>
        );
    }
}
