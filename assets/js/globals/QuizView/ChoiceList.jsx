import React, { Component, PropTypes } from 'react';

import ChoiceNode from 'js/globals/QuizView/ChoiceNode';

export default class ChoiceList extends Component {
    render() {
        const { reviewing } = this.props;

        var correctness = ""

        let isSelected;
        const ChoiceNodes = this.props.choiceList.map((choice, index) => {
            isSelected = false;
            correctness = ""
            if (reviewing) {
                if (this.props.currentQuestionResults.studentAnswer === index
                    && !this.props.currentQuestionResults.isCorrect) {
                    correctness="incorrect"
                    isSelected = true;
                } else if (this.props.currentQuestionResults.correctAnswer === index) {
                    correctness="correct"
                    isSelected = true;
                }
            } else {
                if (index === this.props.selectedAnswer) {
                    isSelected = true;
                }
            }

            return (
                <ChoiceNode
                    key={index}
                    index={index}
                    choiceText={choice.text}
                    selectChoice={this.props.selectChoice}
                    isSelected={isSelected}
                    correctness={correctness}/>
            );
        });

        return (
            <div className="choiceList">
                {ChoiceNodes}
            </div>
        );
    }
}

ChoiceList.propTypes = {
    reviewing: PropTypes.bool.isRequired,
};