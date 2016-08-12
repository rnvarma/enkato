import React, { PropTypes } from 'react';

import QuestionNode from 'js/globals/QuizView/QuestionNode';

const QuestionList = ({ questions }) => {
    const nodes = questions.map(question => (
        <QuestionNode
            key={question.id}
            question={question}
        />
    ));

    return (
        <div className="quizQuestionList">
            {nodes}
        </div>
    );
};

QuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
};

export default QuestionList;
