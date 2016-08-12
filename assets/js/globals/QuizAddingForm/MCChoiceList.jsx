import React, { PropTypes } from 'react';

import MCChoiceNode from 'js/globals/QuizAddingForm/MCChoiceNode';

/**
 * Displays a list of multiple choice questions
 */
const MCChoiceList = ({ choiceList, handleChoiceTextChange, addNewChoice,
    deleteChoice, makeChoiceIsCorrect, invalidChoice, moveFocusUp,
    moveFocusDownOrAddNewChoice }) => {
    const shouldUseX = choiceList.length !== 1;
    const MCChoiceNodes = choiceList.map((choice, index) => {
        const invalid = (invalidChoice !== null &&
            choice.id === invalidChoice.id);
        return (
            <MCChoiceNode
                key={choice.id}
                index={index}
                choice={choice}
                invalid={invalid}
                handleChoiceTextChange={handleChoiceTextChange}
                addNewChoice={addNewChoice}
                deleteChoice={deleteChoice}
                makeChoiceIsCorrect={makeChoiceIsCorrect}
                moveFocusUp={moveFocusUp}
                moveFocusDownOrAddNewChoice={moveFocusDownOrAddNewChoice}
                shouldUseX={shouldUseX}
            />
        );
    });
    return (
        <div>
            {MCChoiceNodes}
        </div>
    );
};

MCChoiceList.propTypes = {
    choiceList: PropTypes.arrayOf(PropTypes.shape({
        length: PropTypes.number,
        map: PropTypes.func,
    })).isRequired,
    invalidChoice: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
    handleChoiceTextChange: PropTypes.func.isRequired,
    addNewChoice: PropTypes.func.isRequired,
    deleteChoice: PropTypes.func.isRequired,
    makeChoiceIsCorrect: PropTypes.func.isRequired,
    moveFocusUp: PropTypes.func.isRequired,
    moveFocusDownOrAddNewChoice: PropTypes.func.isRequired,
};

export default MCChoiceList;
