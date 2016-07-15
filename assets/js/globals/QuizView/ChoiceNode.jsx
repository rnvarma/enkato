require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/ChoiceNode");
var ChoiceNode = require('js/globals/QuizView/ChoiceNode')

module.exports = React.createClass({
    render:function(){
        return(
            <div className="choiceNode">
                {this.props.choiceText}
            </div>
        ) 
    }
})