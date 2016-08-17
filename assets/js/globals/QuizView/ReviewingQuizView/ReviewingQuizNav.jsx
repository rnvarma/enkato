import React, { PropTypes } from 'react';

import QuizNavNode from 'js/globals/QuizView/QuizNavNode';

const ReviewingQuizNav = ({ questions, quizResults, currentQuestion, setQuestion }) => {
    const quizNavNodes = questions.map((q, i) => (
        <QuizNavNode
            key={q.id}
            q={q}
            index={i}
            order={i + 1}
            active={currentQuestion === i}
            setQuestion={setQuestion}
            correct={quizResults[i].isCorrect}
            reviewMode
        />
    ));

    return (
        <div className="quizNav review">
            {quizNavNodes}
        </div>
    );
};

ReviewingQuizNav.propTypes = {
    currentQuestion: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    quizResults: PropTypes.array.isRequired,
    setQuestion: PropTypes.func.isRequired,
};

export default ReviewingQuizNav;
