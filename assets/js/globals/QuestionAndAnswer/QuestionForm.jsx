import React, { PropTypes } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

const QuestionForm = ({ topicList, onSubmit, onTopicChange, onTitleChange, onTextChange, titleValue, textValue, topicValue }) => {
    const options = topicList.map(topic => <option key={topic.real_id} value={topic.real_id}>{topic.name}</option>);

    let topicListValue;
    if (topicValue) {
        topicListValue = topicValue;
    }

    return (
        <div className="questionForm">
            <Form horizontal onSubmit={onSubmit}>
                <FormGroup controlId="topic">
                    <Col componentClass={ControlLabel} sm={3}>
                        Topic
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={onTopicChange} componentClass="select" value={topicListValue}>
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
                        <FormControl onChange={onTitleChange} type="text" value={titleValue} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="text">
                    <Col componentClass={ControlLabel} sm={3}>
                        Description
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={onTextChange} componentClass="textarea" rows={8} type="text" value={textValue} />
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
};

QuestionForm.propTypes = {
    topicList: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTopicChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    titleValue: PropTypes.string.isRequired,
    textValue: PropTypes.string.isRequired,
    topicValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default QuestionForm;
