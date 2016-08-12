import React, { PropTypes } from 'react';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

const QuestionResponseForm = ({ onSubmit, onTextChange, textValue }) => (
    <div className="questionResponseForm">
        <Form onSubmit={onSubmit}>
            <FormGroup controlId="Text">
                <ControlLabel className="title">Response</ControlLabel>
                <FormControl onChange={onTextChange} componentClass="textarea" rows={8} type="text" value={textValue} />
            </FormGroup>
        </Form>
    </div>
);

QuestionResponseForm.propTypes = {
    textValue: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
};

export default QuestionResponseForm;
