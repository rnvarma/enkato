import React, { PropTypes } from 'react';

import QuizNavNode from 'js/globals/QuizView/QuizNavNode';

const QuizNav = ({ questions, currentQuestion, setQuestion }) => {
    const quizNavNodes = questions.map((q, i) => (
        <QuizNavNode
            key={q.id}
            q={q}
            index={i}
            order={i + 1}
            active={currentQuestion === i}
            setQuestion={setQuestion}
        />
    ));
    return (
        <div className="quizNav">
            {quizNavNodes}
        </div>
    );
};

QuizNav.propTypes = {
    questions: PropTypes.array.isRequired,
    currentQuestion: PropTypes.number.isRequired,
    setQuestion: PropTypes.func,
};

export default QuizNav;
