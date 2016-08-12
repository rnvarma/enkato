import React, { PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

const BottomReviewText = ({ correct }) => {
    let text = '';
    if (correct) {
        text = 'You answered this correctly!';
    } else {
        text = 'You answered this incorrectly.';
    }
    return (
        <div className={'correctOrNot'}>
            <FontAwesome
                className={'correctness-icon'}
                name={(correct) ? 'check-circle' : 'times-circle'}
                id={(correct) ? 'check-correct' : 'check-incorrect'}
            />
            <span className={'correctnessText'}>
                {text}
            </span>
        </div>
    );
};

BottomReviewText.propTypes = {
    correct: PropTypes.bool,
};

export default BottomReviewText;
