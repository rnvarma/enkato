require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/ChoiceList");
var ChoiceNode = require('js/globals/QuizView/ChoiceNode')

module.exports = React.createClass({
    render:function(){
        var index = -1;
        var isSelected=false;
        var correctness=""
        var ChoiceNodes = this.props.choiceList.map(function(choice){
            index++;
            isSelected=false;
            correctness=""
            if(this.props.reviewMode){
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
            

            return(
                <ChoiceNode 
                    index={index}
                    choiceText={choice.text}
                    selectChoice={this.props.selectChoice}
                    isSelected={isSelected}
                    correctness={correctness}/>
            )
        }.bind(this))
        return(
            <div className="choiceList">
                {ChoiceNodes}
            </div>
        )
    }
})