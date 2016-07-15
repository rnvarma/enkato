require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/QuestionNode");
var ChoiceList = require('js/globals/QuizView/ChoiceList')
var FontAwesome = require('react-fontawesome');
import Button from 'react-bootstrap/lib/Button';


module.exports = React.createClass({
    submitInfo:function(){
        console.log("submitting info")
    },
    render:function(){
        if (!this.props.question) {
            return (
                <div className="questionNode noQuiz">
                    The instructor has not created a quiz for this video.
                </div>
            )
        }
        var submitSection = (<div></div>)
        if(this.props.isLast){
            submitSection = (
                <div>
                    <hr className="quizSubmitButtonHR"/>
                    <Button
                        className="quizSubmitAnswerButton"
                        onClick={this.submitInfo}>
                        Submit
                    </Button>
                </div>
            )
        }
        return(
            <div className="questionNode">
                <div className="title"> 
                    <FontAwesome className='arrowIcon' name='arrow-right'/>
                    <span className="titleText">
                        {this.props.question.quizQuestionText} 
                    </span>
                </div>
                <ChoiceList 
                    selectChoice={this.props.selectChoice}
                    className="choiceList"
                    choiceList={this.props.question.choiceList}
                    selectedAnswer={this.props.selectedAnswer}/>
                {submitSection}
            </div>
        )
    }
})