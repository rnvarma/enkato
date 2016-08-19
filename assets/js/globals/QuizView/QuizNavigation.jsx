import React, { PropTypes } from 'react';

import QuizNavigationNode from 'js/globals/QuizView/QuizNavigationNode';

const QuizNavigation = ({ questions, quizResponses, answers, currentQuestion, reviewingQuiz, goToQuestion }) => {
    const nodes = questions.map((question, index) => {
        let result;
        if (quizResponses) {
            result = quizResponses[index];
        }
        return (
            <QuizNavigationNode
                key={index}
                index={index}
                selected={currentQuestion === index}
                result={result}
                answered={answers[index] != null}
                reviewingQuiz={reviewingQuiz}
                goToQuestion={goToQuestion}
            />
        );
    });

    return (
        <div className="quizNavigation">
            {nodes}
        </div>
    );
};

QuizNavigation.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    quizResponses: PropTypes.arrayOf(PropTypes.object),
    answers: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentQuestion: PropTypes.number.isRequired,
    reviewingQuiz: PropTypes.bool.isRequired,
    goToQuestion: PropTypes.func.isRequired,
};

export default QuizNavigation;
