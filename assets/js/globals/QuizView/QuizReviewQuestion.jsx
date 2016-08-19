import React, { PropTypes } from 'react';

import QuizReviewQuestionChoice from 'js/globals/QuizView/QuizReviewQuestionChoice';

const QuizReviewQuestion = ({ question, quizResponse, index }) => {
    const choices = question.choiceList.map((choice, i) => (
        <QuizReviewQuestionChoice
            key={choice.id}
            choice={choice}
            index={i}
            studentChoice={quizResponse.student_answer === i}
            correctChoice={quizResponse.correct_answer === i}
        />
    ));

    return (
        <div className="quizReviewQuestion quizQuestion">
            Review Q{index + 1}: {question.quizQuestionText}
            {choices}
        </div>
    );
};

QuizReviewQuestion.propTypes = {
    question: PropTypes.shape({
        quizQuestionText: PropTypes.string.isRequired,
        choiceList: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    quizResponse: PropTypes.shape({
        student_answer: PropTypes.number.isRequired,
        correct_answer: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default QuizReviewQuestion;
