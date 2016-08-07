import React from 'react';

import Button from 'react-bootstrap/lib/Button';

import request from 'js/globals/HttpRequest';
import QuestionResponseForm from 'js/globals/QuestionAndAnswer/QuestionResponseForm';

class QuestionResponseEditForm extends React.Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.patch = this.patch.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.patch();
    }

    onTextChange(event) {
        this.props.pushResponseEditText(this.props.question.id, this.props.response.id, event.target.value);
    }

    patch() {
        if (this.props.response.input !== this.props.response.text) {
            /* TODO: error handling on failing to patch */
            const data = {
                text: this.props.response.input,
            };
            request.patch(`/1/responses/${this.props.response.id}`, {
                data: data,
                success: (data) => {
                    this.props.toggleEdit();
                    this.props.replaceResponse(this.props.question.id, data.id, data);
                }
            })
        }
    }

    render() {
        return (
          <div className="questionResponseEditForm">
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
