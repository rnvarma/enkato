require('css/singlevideo/singlevideoview/QuestionDisplayResponse.scss');

import React from 'react';

import Row from 'react-bootstrap/lib/Row';

class QuestionDisplayResponse extends React.Component {
    render() {
        return (
            <Row className="questionDisplayResponse">
                response text: {this.props.response.text}
            </Row>
        );
    }
}

export default QuestionDisplayResponse;
