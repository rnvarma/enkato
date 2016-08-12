import React, { PropTypes } from 'react';

import SingleQuizForm from 'js/globals/QuizAddingForm/SingleQuizForm';

/**
 * displays a list of quiz forms
 */
const QuizFormsList = ({ setChoiceList, handleQuizQuestionChange, addNewChoice, deleteChoice, deleteQuestion, makeChoiceIsCorrect, scrollToQuestion, questions, invalidQuestion, invalidChoice }) => {
    const QuizFormNodes = questions.map((question, index) => {
        const invalid = invalidQuestion !== null && invalidChoice === null && question.id === invalidQuestion.id;
        return (
            <SingleQuizForm
                key={question.id}
                handleQuizQuestionChange={handleQuizQuestionChange}
                setChoiceList={setChoiceList}
                invalid={invalid}
                invalidChoice={invalidChoice}
                addNewChoice={addNewChoice}
                deleteChoice={deleteChoice}
                deleteQuestion={deleteQuestion}
                makeChoiceIsCorrect={makeChoiceIsCorrect}
                scrollToQuestion={scrollToQuestion}
                index={index}
                question={question}
            />
        );
    });

    return (
        <div className="quizFormList">
            {QuizFormNodes}
        </div>
    );
};

QuizFormsList.propTypes = {
    setChoiceList: PropTypes.func.isRequired,
    handleQuizQuestionChange: PropTypes.func.isRequired,
    addNewChoice: PropTypes.func.isRequired,
    deleteChoice: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    makeChoiceIsCorrect: PropTypes.func.isRequired,
    scrollToQuestion: PropTypes.func.isRequired,
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
    invalidQuestion: PropTypes.shape({
        shouldRefocus: PropTypes.bool,
        currentFoucs: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired,
        quizQuestionText: PropTypes.string.isRequired,
        new: PropTypes.bool.isRequired,
        choiceList: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            is_correct: PropTypes.bool.isRequired,
        })).isRequired,
        id: PropTypes.string.isRequired,
    }),
    invalidChoice: PropTypes.shape({
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        is_correct: PropTypes.bool.isRequired,
    }),
};

export default QuizFormsList;
