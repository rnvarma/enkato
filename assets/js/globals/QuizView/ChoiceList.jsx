require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/ChoiceList");
var ChoiceNode = require('js/globals/QuizView/ChoiceNode')

module.exports = React.createClass({
    render:function(){
        var ChoiceNodes = this.props.choiceList.map(function(choice){
            return(
                <ChoiceNode choiceText={choice.text}/>
            )
        }.bind(this))
        return(
            <div className="choiceList">
                {ChoiceNodes}
            </div>
        )
    }
})