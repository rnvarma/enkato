import React, { PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

import ChoiceList from 'js/globals/QuizView/ChoiceList';

const QuestionNode = ({ question, selectChoice, selectedAnswer, currentQuestionResults, reviewMode }) => {
    if (!question) {
        return (
            <div className="questionNode noQuiz">
                The instructor has not created a quiz for this video.
            </div>
        );
    }

    return (
        <div className="questionNode">
            <div className="title">
                <FontAwesome className="arrowIcon" name="arrow-right" />
                <span className="titleText">
                    {question.quizQuestionText}
                </span>
            </div>
            <ChoiceList
                selectChoice={selectChoice}
                className="choiceList"
                choiceList={question.choiceList}
                selectedAnswer={selectedAnswer}
                currentQuestionResults={currentQuestionResults}
                reviewing={reviewMode}
            />
        </div>
    );
};

QuestionNode.propTypes = {
    question: PropTypes.shape({
        quizQuestionText: PropTypes.string.isRequired,
        choiceList: PropTypes.array.isRequired,
    }).isRequired,
    selectChoice: PropTypes.func.isRequired,
    selectedAnswer: PropTypes.number,
    currentQuestionResults: PropTypes.array.isRequired,
    reviewMode: PropTypes.bool.isRequired,
};

export default QuestionNode;
