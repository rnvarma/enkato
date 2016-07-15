require('css/singlevideo/singlevideoview/QuestionResponseEditForm.scss');

import React from 'react';

import getCookie from 'js/globals/GetCookie';

import Button from 'react-bootstrap/lib/Button';

import QuestionResponseForm from 'js/singlevideo/singlevideoview/QuestionResponseForm';

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
        /* TODO: error handling on failing to patch */
        const data = {
            text: this.props.response.input,
        };
        $.ajax({
            url: `/api/videos/${this.props.videoUUID}/responses/${this.props.response.id}`,
            type: 'PATCH',
            data,
            beforeSend(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success: () => {
                this.props.toggleEdit();
                this.props.pushResponseNewText(this.props.question.id, this.props.response.id, this.props.response.input);
            },
        });
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
              <Button onClick={this.props.toggleEdit}>Cancel</Button>
              <Button onClick={this.props.delete}>Delete</Button>
          </div>
        );
    }
}

export default QuestionResponseEditForm;