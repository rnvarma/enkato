require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/QuestionList");
var QuestionNode = require('js/globals/QuizView/QuestionNode');

module.exports = React.createClass({
    render:function(){
        var QuestionNodes = this.props.questions.map(function(question, index){
            return (
                <QuestionNode
                    key={question.id}
                    question={question}/>
            )
        }.bind(this))
        return(
            <div className="quizQuestionList">
                {QuestionNodes}
            </div>
        )
    }
})