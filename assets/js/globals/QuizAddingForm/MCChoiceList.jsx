import React, { Component } from 'react';

import MCChoiceNode from 'js/globals/QuizAddingForm/MCChoiceNode';

class MCChoiceList extends Component {
    render() {
        const shouldUseX = this.props.choiceList.length !== 1
        const MCChoiceNodes = this.props.choiceList.map((choice, index) => {
            const invalid = this.props.invalidChoice !== null && choice.id === this.props.invalidChoice.id
            return (
                <MCChoiceNode
                    key={choice.id}
                    index={index}
                    choice={choice}
                    invalid={invalid}
                    handleChoiceTextChange={this.props.handleChoiceTextChange}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    moveFocusUp={this.props.moveFocusUp}
                    moveFocusDownOrAddNewChoice={this.props.moveFocusDownOrAddNewChoice}
                    shouldUseX={shouldUseX}/>
            );
        });
        return (
            <div>
                {MCChoiceNodes}
            </div>
        );
    }
}

export default MCChoiceList;