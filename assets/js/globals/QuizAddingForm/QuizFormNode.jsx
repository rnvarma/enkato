
require("css/globals/QuizAddingForm/QuizFormNode.scss");

var React = require('react')

var SingleQuizForm = require('js/globals/QuizAddingForm/SingleQuizForm')

module.exports = React.createClass({
    render: function(){
        return(
            <div id={this.props.question.id+"q"}>
                <SingleQuizForm 
                    questionNumber={this.props.keyCode}
                    handleQuizQuestionChange={this.props.handleQuizQuestionChange}
                    setShouldRefocus={this.props.setShouldRefocus}
                    setChoiceList={this.props.setChoiceList}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    scrollToFromButton={this.props.scrollToFromButton}
                    index={this.props.index}
                    question={this.props.question}/>
            </div>
        )
    }
})