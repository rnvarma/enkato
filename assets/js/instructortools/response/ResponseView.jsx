import React, { Component, PropTypes } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import request from 'js/globals/HttpRequest';
import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

class ResponseView extends Component {
    static propTypes = {
        userId: PropTypes.number.isRequired,
    }

    loadQuestionData = (onSuccess) => {
        request.get(`/1/series?creator=${this.props.userId}&order_by=responses`, {
            success: (data) => {
                const questionData = [];
                data.forEach((series) => {
                    series.videos.forEach((video) => {
                        video.video.question_set.forEach((question) => {
                            questionData.push(question);
                        });
                    });
                });
                onSuccess(questionData);
            },
        });
    }

    render() {
        return (
            <div className="responseView">
                <Row>
                    <Col mdOffset={1} md={10}>
                        <QuestionView
                            loadQuestionData={this.loadQuestionData}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ResponseView;
