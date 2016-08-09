import 'css/globals/QuizView/ChoiceList';

import React, { PropTypes } from 'react';

import ChoiceNode from 'js/globals/QuizView/ChoiceNode';

const ChoiceList = ({ reviewing, choiceList, currentQuestionResults,
    selectedAnswer, selectChoice }) => {
    let correctness = '';

    let isSelected;
    const ChoiceNodes = choiceList.map((choice, index) => {
        isSelected = false;
        correctness = '';
        if (reviewing) {
            if (currentQuestionResults.studentAnswer === index
                && !currentQuestionResults.isCorrect) {
                correctness = 'incorrect';
                isSelected = true;
            } else if (currentQuestionResults.correctAnswer === index) {
                correctness = 'correct';
                isSelected = true;
            }
        } else if (index === selectedAnswer) {
            isSelected = true;
        }

        return (
            <ChoiceNode
                key={index}
                index={index}
                choiceText={choice.text}
                selectChoice={selectChoice}
                isSelected={isSelected}
                correctness={correctness}
            />
        );
    });

    return (
        <div className="choiceList">
            {ChoiceNodes}
        </div>
    );
};

ChoiceList.propTypes = {
    reviewing: PropTypes.bool.isRequired,
    choiceList: PropTypes.array,
    selectChoice: PropTypes.func,
    currentQuestionResults: PropTypes.shape({
        isCorrect: PropTypes.bool,
        correctAnswer: PropTypes.number,
    }),
    selectedAnswer: PropTypes.number,
};

export default ChoiceList;
