require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/ChoiceList");
var ChoiceNode = require('js/globals/QuizView/ChoiceNode')

module.exports = React.createClass({
    render:function(){
        var index = -1;
        var ChoiceNodes = this.props.choiceList.map(function(choice){
            index++;
            var isSelected=false;
            if(index == this.props.selectedAnswer){
                isSelected = true;
            }
            return(
                <ChoiceNode 
                    index={index}
                    choiceText={choice.text}
                    selectChoice={this.props.selectChoice}
                    isSelected={isSelected}/>
            )
        }.bind(this))
        return(
            <div className="choiceList">
                {ChoiceNodes}
            </div>
        )
    }
})