import React, { Component, PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';

import request from 'js/globals/HttpRequest';
import QuestionResponseForm from 'js/globals/QuestionAndAnswer/QuestionResponseForm';

class QuestionResponseEditForm extends Component {
    static propTypes = {
        question: PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired,
        response: PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            input: PropTypes.string.isRequired,
        }).isRequired,
        pushResponseEditText: PropTypes.func.isRequired,
        toggleEdit: PropTypes.func.isRequired,
        replaceResponse: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
        embed: PropTypes.bool,
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.patch();
    }

    onTextChange = (e) => {
        this.props.pushResponseEditText(this.props.question.id, this.props.response.id, e.target.value);
    }

    patch = () => {
        if (this.props.response.input !== this.props.response.text) {
            const payload = {
                text: this.props.response.input,
            };
            request.patch(`/1/responses/${this.props.response.id}`, {
                data: payload,
                success: (data) => {
                    this.props.toggleEdit();
                    this.props.replaceResponse(this.props.question.id, data.id, data);
                },
            }, this.props.embed);
        }
    }

    render() {
        return (
            <div className="questionResponseEditForm contentArea">
                <QuestionResponseForm
                    onSubmit={this.onSubmit}
                    onTextChange={this.onTextChange}
                    textValue={this.props.response.input}
                    key={this.props.response.id}
                />
                <Button className="btn-primary" onClick={this.onSubmit}>Publish</Button>
                <Button className="btn-secondary" onClick={this.props.toggleEdit}>Cancel</Button>
                <Button className="btn-secondary" onClick={this.props.delete}>Delete</Button>
            </div>
        );
    }
}

export default QuestionResponseEditForm;
