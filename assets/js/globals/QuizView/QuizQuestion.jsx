import React, { PropTypes } from 'react';

import QuizQuestionChoice from 'js/globals/QuizView/QuizQuestionChoice';

const QuizQuestion = ({ question, index, goToChoice, currentAnswer }) => {
    const choices = question.choiceList.map((choice, i) => (
        <QuizQuestionChoice
            key={choice.id}
            choice={choice}
            goToChoice={goToChoice}
            index={i}
            selected={i === currentAnswer}
        />
    ));
    return (
        <div className="quizQuestion">
            Q{index + 1}: {question.quizQuestionText}
            {choices}
        </div>
    );
};

QuizQuestion.propTypes = {
    question: PropTypes.shape({
        quizQuestionText: PropTypes.string.isRequired,
        choiceList: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    goToChoice: PropTypes.func.isRequired,
    currentAnswer: PropTypes.number,
};

export default QuizQuestion;
