import 'css/globals/QuizAddingForm/MCChoiceList.scss';

import React, { PropTypes } from 'react';

import MCChoiceNode from 'js/globals/QuizAddingForm/MCChoiceNode';

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
    choiceList: PropTypes.shape({
        length: PropTypes.number,
        map: PropTypes.func,
    }),
    invalidChoice: PropTypes.shape({
        id: PropTypes.number,
    }),
    handleChoiceTextChange: PropTypes.func,
    addNewChoice: PropTypes.func,
    deleteChoice: PropTypes.func,
    makeChoiceIsCorrect: PropTypes.func,
    moveFocusUp: PropTypes.func,
    moveFocusDownOrAddNewChoice: PropTypes.func,
};

export default MCChoiceList;
