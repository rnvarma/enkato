import React, { PropTypes } from 'react';

import ScrollButtonNode from 'js/globals/QuizAddingForm/ScrollButtonNode';

/**
 * displays a scrollable button list
 */
const ScrollButtonList = ({ scrollToFromButton, questions }) => {
    const ScrollButtonNodes = questions.map((question, index) =>
        <ScrollButtonNode
            key={question.id}
            questionId={question.id}
            active={question.active}
            scrollToQuestion={scrollToFromButton}
            index={index}
            order={index + 1}
        />
    );

    return (
        <div>
            {ScrollButtonNodes}
        </div>
    );
};

ScrollButtonList.propTypes = {
    scrollToFromButton: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
        shouldRefocus: PropTypes.bool,
        currentFoucs: PropTypes.number,
        active: PropTypes.bool,
        quizQuestionText: PropTypes.string.isRequired,
        new: PropTypes.bool.isRequired,
        choiceList: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            is_correct: PropTypes.bool.isRequired,
        })).isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
};

export default ScrollButtonList;
