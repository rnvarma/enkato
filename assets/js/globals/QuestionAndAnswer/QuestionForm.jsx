require('css/globals/QuestionAndAnswer/QuestionForm.scss');

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class QuestionForm extends React.Component {
  render() {
    const options = this.props.topicList.map((topic) => {
      return (<option key={topic.real_id} value={topic.real_id}>{topic.name}</option>);
    });
    var topicListValue;
    if (this.props.topicValue) {
      topicListValue = this.props.topicValue;
    }console.log("OY", topicListValue);
    return (
      <div className="questionForm">
        <Form horizontal onSubmit={this.props.onSubmit}>
          <FormGroup controlId="topic">
            <Col componentClass={ControlLabel} sm={3}>
              Topic
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.onTopicChange} componentClass="select" value={topicListValue}>
                <option>General</option>
                {options}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="title">
            <Col componentClass={ControlLabel} sm={3}>
              Summary
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.onTitleChange} type="text" value={this.props.titleValue} />
            </Col>
          </FormGroup>
          <FormGroup controlId="text">
            <Col componentClass={ControlLabel} sm={3}>
              Description
            </Col>
            <Col sm={9}>
              <FormControl onChange={this.props.onTextChange} componentClass="textarea" rows={8} type="text" value={this.props.textValue} />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default QuestionForm;
