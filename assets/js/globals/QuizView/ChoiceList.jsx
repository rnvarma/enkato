require("css/globals/QuizView/ChoiceList");

import React, { Component, PropTypes } from 'react';

import ChoiceNode from 'js/globals/QuizView/ChoiceNode';

class ChoiceList extends Component {
  render() {
    var index = -1;
    var isSelected=false;
    var correctness=""
    const ChoiceNodes = this.props.choiceList.map((choice) => {
      index++;
      isSelected=false;
      correctness=""
      if(this.props.reviewing) {
        if(this.props.currentQuestionResults.studentAnswer==index
          && !this.props.currentQuestionResults.isCorrect){
          correctness="incorrect"
          isSelected = true;
        } else if(this.props.currentQuestionResults.correctAnswer==index){
          correctness="correct"
          isSelected = true;
        }
      } else {
        if(index == this.props.selectedAnswer){
          isSelected = true;
        }
      }

      return (
        <ChoiceNode
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

export default ChoiceList;
