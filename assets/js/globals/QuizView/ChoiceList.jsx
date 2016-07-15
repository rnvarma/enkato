require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/ChoiceList");
var ChoiceNode = require('js/globals/QuizView/ChoiceNode')

module.exports = React.createClass({
    render:function(){
        var index = -1;
        var ChoiceNodes = this.props.choiceList.map(function(choice){
            index++;
            return(
                <ChoiceNode 
                    index={index}
                    choiceText={choice.text}
                    selectChoice={this.props.selectChoice}/>
            )
        }.bind(this))
        return(
            <div className="choiceList">
                {ChoiceNodes}
            </div>
        )
    }
})