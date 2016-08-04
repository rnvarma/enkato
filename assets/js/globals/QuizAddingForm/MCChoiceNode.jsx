require('css/globals/QuizAddingForm/MCChoiceNode.scss');

import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';

class MCChoiceNode extends Component {
    constructor() {
        super();

        this.handleChoiceTextChange = this.handleChoiceTextChange.bind(this);
        this.submit = this.submit.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChoiceSelected = this.onChoiceSelected.bind(this);
    }

    handleChoiceTextChange(e) {
        this.props.handleChoiceTextChange(e.target.value, this.props.index, this.props.choice.id)
    }

    submit(e) {
        e.preventDefault()
        this.props.moveFocusDownOrAddNewChoice(this.props.index)
    }

    deleteChoice() {
        if(this.props.shouldUseX)
            this.props.deleteChoice(this.props.choice.id, this.props.index)
    }

    onKeyDown(e) {
        if (e.keyCode === 8 && !this.props.choice.text) { // backspace
            e.preventDefault()
            this.props.deleteChoice(this.props.choice.id, this.props.index);
        } else if (e.keyCode === 38) {  // up
            this.props.moveFocusUp(this.props.index);
        } else if (e.keyCode == 40) {  // down
            this.props.moveFocusDownOrAddNewChoice(this.props.index);
        }
    }

    onChoiceSelected() {
        this.props.makeChoiceIsCorrect(this.props.choice.id);
    }

    render() {
        const { choice, index } = this.props;
        const placeholder = `Choice ${index + 1}`;

        return (
            <form onSubmit={this.submit}>
                <Row className={'choice-row' + (this.props.invalid ? ' invalid' : '')}>
                    <FontAwesome
                        className={'circle-icon' + (choice.is_correct ? " correct" : "")}
                        name={choice.is_correct ? 'check-circle' : 'circle-thin'}
                        onClick={this.onChoiceSelected}/>
                    <input
                        className={'choice-input' + (this.props.invalid ? ' invalid' : '')}
                        type="text"
                        placeholder={placeholder}
                        onChange={this.handleChoiceTextChange}
                        id={choice.id}
                        onKeyDown={this.onKeyDown}
                        value={choice.text}/>
                    <FontAwesome 
                        className="timesIcon"
                        name='times'
                        onClick={this.deleteChoice}/>
                    <div type="submit">
                    </div>
                </Row>
            </form>
        );
    }
}

export default MCChoiceNode;