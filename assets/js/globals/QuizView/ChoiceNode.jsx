import 'css/globals/QuizView/ChoiceNode';

import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

class ChoiceNode extends Component {
    constructor(props) {
        super(props);

        this.selectChoice = this.selectChoice.bind(this);
    }
    selectChoice() {
        this.props.selectChoice(this.props.index);
    }

    render() {
        return (
            <div className={'choiceNode '} id={this.props.correctness}>
                <FontAwesome
                    className={'circle-icon'}
                    id={(this.props.isSelected) ? 'selected' : ''}
                    name={(this.props.isSelected) ? 'circle' : 'circle-thin'}
                    onClick={this.selectChoice}
                />
                <span className={'choiceText'} onClick={this.selectChoice}>
                    {this.props.choiceText}
                </span>
            </div>
        );
    }
}

ChoiceNode.propTypes = {
    selectChoice: PropTypes.func,
    correctness: PropTypes.string,
    choiceText: PropTypes.string,
    isSelected: PropTypes.bool,
    index: PropTypes.number,
};

export default ChoiceNode;
