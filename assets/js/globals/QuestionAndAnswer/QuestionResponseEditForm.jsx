require('css/globals/QuestionAndAnswer/QuestionResponseEditForm.scss');

import React from 'react';

import getCookie from 'js/globals/GetCookie';

import Button from 'react-bootstrap/lib/Button';

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
            $.ajax({
                url: `/api/responses/${this.props.response.id}`,
                type: 'PATCH',
                data,
                beforeSend(xhr) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
                },
                success: (data) => {
                    this.props.toggleEdit();
                    this.props.replaceResponse(this.props.question.id, data.id, data);
                },
            });
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
              <Button onClick={this.onSubmit}>Publish</Button>
              <Button onClick={this.props.toggleEdit}>Cancel</Button>
              <Button onClick={this.props.delete}>Delete</Button>
          </div>
        );
    }
}

export default QuestionResponseEditForm;
