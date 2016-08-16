import React, { PropTypes } from 'react';

import Dotdotdot from 'react-dotdotdot';
import moment from 'moment';

import Col from 'react-bootstrap/lib/Col';

import { pluralize } from 'js/globals/utility';

const QuestionList = ({ questions, currentQuestion, showingSeries, setCurrentQuestion }) => {
    const unresolvedMarker = <div className="questionPreviewUnresolved" />;

    const questionList = questions.map((q, index) => {
        const question = q;
        const responseCount = question.responses ? question.responses.length : 0;
        question.modified = moment(question.modified);

        let header;
        if (showingSeries) {
            header = question.video.name;
        } else {
            header = question.topic ? question.topic.name : 'General';
        }

        const setQuestion = function set() {
            setCurrentQuestion(question);
        };

        return (
            <div
                key={index}
                className={`${currentQuestion && question.id === currentQuestion.id ? 'selected ' : ''}questionPreview`}
                onClick={setQuestion}
            >
                <div className="questionPreviewHeader smallTitle">
                    <Dotdotdot className="questionPreviewHeaderTopic" clamp={1}>
                        {header}
                    </Dotdotdot>
                    {question.resolved ? '' : unresolvedMarker}
                </div>
                <Dotdotdot className="questionPreviewTitle" clamp={1}>
                    {question.title}
                </Dotdotdot>
                <Dotdotdot className="questionPreviewText" clamp={3}>
                    {question.text}
                </Dotdotdot>
                <div className="questionPreviewFooter">
                    <div className="metaItem">
                        {question.modified.fromNow()}
                    </div>
                    <div className="metaItem">
                        {responseCount} {pluralize('answer', responseCount)}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <Col md={4} className="questionList">
            {questionList}
        </Col>
    );
};

QuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
    currentQuestion: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
    showingSeries: PropTypes.bool.isRequired,
    setCurrentQuestion: PropTypes.func.isRequired,
};

export default QuestionList;
