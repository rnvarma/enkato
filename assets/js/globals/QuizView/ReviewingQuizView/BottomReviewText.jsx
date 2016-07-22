require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/ReviewingQuizView/BottomReviewText");
var FontAwesome = require('react-fontawesome');

module.exports = React.createClass({
    render:function(){
        var text = ""
        if(this.props.correct){
            text = "You answered this correctly!"
        } else {
            text = "You answered this incorrectly."
        }
        return(
            <div className="correctOrNot">
                <FontAwesome
                    className="correctness-icon"
                    name={(this.props.correct)?"check-circle":"times-circle"}
                    id={(this.props.correct)?"check-correct":"check-incorrect"}/>
                <span className="correctnessText">
                    {text}
                </span>
            </div>
        ) 
    }
})