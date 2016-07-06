
require("css/globals/QuizAddingForm/QuizFormsList.scss");

var React = require('react')

var QuizFormNode = require('js/globals/QuizAddingForm/QuizFormNode');

module.exports = React.createClass({
    render: function(){
        var QuizFormNodes = this.props.questions.map(function(question, index){
            return (
                <QuizFormNode
                    key={question.id}
                    handleQuizQuestionChange={this.props.handleQuizQuestionChange}
                    setShouldRefocus={this.props.setShouldRefocus}
                    setChoiceList={this.props.setChoiceList}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    scrollToFromButton={this.props.scrollToFromButton}
                    index={index}
                    question={question}/>
            )
        }.bind(this))
        return(
            <div className="quizFormList">
                {QuizFormNodes}
            </div>
        )
    }
})