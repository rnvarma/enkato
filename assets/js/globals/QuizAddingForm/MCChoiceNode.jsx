import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';
import Row from 'react-bootstrap/lib/Row';

/**
 * Displays a choice of a multiple choice question
 */
export default class MCChoiceNode extends Component {
    static propTypes = {
        choice: PropTypes.shape({
            text: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
        deleteChoice: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        moveFocusUp: PropTypes.func.isRequired,
        moveFocusDownOrAddNewChoice: PropTypes.func.isRequired,
        makeChoiceIsCorrect: PropTypes.func.isRequired,
        shouldUseX: PropTypes.bool.isRequired,
        handleChoiceTextChange: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
    };
    /**
     * handles keyboard based choice selection
     * @param {SyntheticEvent} e
     */
    onKeyDown = (e) => {
        if (e.keyCode === 8 && !this.props.choice.text) { // backspace
            e.preventDefault();
            this.props.deleteChoice(this.props.choice.id, this.props.index);
        } else if (e.keyCode === 38) {  // up
            this.props.moveFocusUp(this.props.index);
        } else if (e.keyCode === 40) {  // down
            this.props.moveFocusDownOrAddNewChoice(this.props.index);
        }
    }

    /**
     * selects this choice as the correct one
     */
    onChoiceSelected = () => {
        this.props.makeChoiceIsCorrect(this.props.choice.id);
    }

    /**
     * deletes this choice
     */
    deleteChoice = () => {
        if (this.props.shouldUseX) {
            this.props.deleteChoice(this.props.choice.id, this.props.index);
        }
    }

    /**
     * called when the choice choice is submitted
     * @param {SyntheticEvent} e
     */
    submit = (e) => {
        e.preventDefault();
        this.props.moveFocusDownOrAddNewChoice(this.props.index);
    }

    /**
     * handles changes to the text of this choice
     * @param {SyntheticEvent} e
     */
    handleChoiceTextChange = (e) => {
        this.props.handleChoiceTextChange(e.target.value, this.props.index, this.props.choice.id);
    }

    render() {
        const { choice, index } = this.props;
        const placeholder = `Choice ${index + 1}`;

        return (
            <form onSubmit={this.submit}>
                <Row className={`choice-row ${this.props.invalid ? ' invalid' : ''}`}>
                    <FontAwesome
                        className={`circle-icon ${choice.is_correct ? ' correct' : ''}`}
                        name={choice.is_correct ? 'check-circle' : 'circle-thin'}
                        onClick={this.onChoiceSelected}
                    />
                    <input
                        className={`choice-input ${this.props.invalid ? ' invalid' : ''}`}
                        type={'text'}
                        placeholder={placeholder}
                        onChange={this.handleChoiceTextChange}
                        id={choice.id}
                        onKeyDown={this.onKeyDown}
                        value={choice.text}
                    />
                    <FontAwesome
                        className={'timesIcon'}
                        name={'times'}
                        onClick={this.deleteChoice}
                    />
                    <div type={'submit'} />
                </Row>
            </form>
        );
    }
}
