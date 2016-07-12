require('css/singlevideo/singlevideoview/QuestionResponseForm.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import getCookie from 'js/globals/GetCookie';

class QuestionResponseForm extends React.Component {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.question.responseInput) {
      const data = {
        text: this.props.question.responseInput,
        question: this.props.question.id,
      };

      $.ajax({
        url: `/api/videos/${this.props.videoUUID}/responses`,
        dataType: 'json',
        type:'POST',
        data,
        beforeSend: (xhr) => {
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

  onTextChange(event) {
    this.props.pushResponseText(this.props.question.id, event.target.value);
  }

  render() {
    return (
      <div className="questionResponseForm">
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="Text">
            <Col componentClass={ControlLabel} sm={3}>
              Response
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.onTextChange} componentClass="textarea" rows={8} type="text" value={this.props.question.responseInput} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} smOffset={10}>
              <Button type="submit">Respond</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default QuestionResponseForm;
