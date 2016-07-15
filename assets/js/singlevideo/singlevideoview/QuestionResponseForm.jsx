require('css/singlevideo/singlevideoview/QuestionResponseForm.scss');

import React from 'react';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class QuestionResponseForm extends React.Component {
  render() {
    return (
      <div className="questionResponseForm">
        <Form onSubmit={this.props.onSubmit}>
          <FormGroup controlId="Text">
            <ControlLabel>Response</ControlLabel>
            <FormControl onChange={this.props.onTextChange} componentClass="textarea" rows={8} type="text" value={this.props.textValue} />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default QuestionResponseForm;
