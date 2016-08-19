import React, { PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

const QuizReviewQuestionChoice = ({ choice, index, studentChoice, correctChoice }) => {
    const studentCorrect = studentChoice && correctChoice;

    let style = '';
    let icon;
    if (studentCorrect || correctChoice) {
        style = ' correct';
        icon = 'check-circle-o';
    } else if (studentChoice) {
        style = ' incorrect';
        icon = 'times-circle-o';
    } else {
        icon = 'circle-o';
    }

    return (
        <div className={`quizReviewQuestionChoice quizQuestionChoice${style}`}>
            <FontAwesome name={icon} />
            <span className="text">{choice.text}</span>
        </div>
    );
};

QuizReviewQuestionChoice.propTypes = {
    choice: PropTypes.shape({
        text: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    studentChoice: PropTypes.bool.isRequired,
    correctChoice: PropTypes.bool.isRequired,
};

export default QuizReviewQuestionChoice;
