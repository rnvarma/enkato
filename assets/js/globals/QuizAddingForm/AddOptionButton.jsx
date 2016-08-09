import React, { PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

const AddOptionButton = ({ handleClick }) => (
    <Row className={'choice-row'} onClick={handleClick}>
        <FontAwesome
            className={'circle-icon'}
            name={'circle-thin'}
        />
        <span className="add-option-button">Add Option</span>
    </Row>
);

AddOptionButton.propTypes = {
    handleClick: PropTypes.func,
};

export default AddOptionButton;
