
require('css/globals/QuizAddingForm/singlequizaddingform.scss')
var React = require('react')
var ReactDOM = require('react-dom')

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Row = require('react-bootstrap').Row;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;
var FontAwesome = require('react-fontawesome');

var QuizQuestion = require('js/globals/QuizAddingForm/QuizQuestion');
var AddOptionButton = require('js/globals/QuizAddingForm/AddOptionButton');
var MCChoiceList = require('js/globals/QuizAddingForm/MCChoiceList');

//http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


module.exports = React.createClass({
    getInitialState: function(){
        return {
            choiceList:[{text:"", keyCode:makeid()}]
        }
    },
    handleQuizQuestionChange: function(questionText){
        this.props.handleQuizQuestionChange(questionText, this.props.index)
    },
    handleChoiceTextChange: function(text, index, cid){
        var tempChoiceList = this.props.question.choiceList;
        tempChoiceList[index].text = text;
        this.props.setChoiceList(tempChoiceList, this.props.index)
    },
    moveFocusDownOrAddNewChoice: function(index) {
        if (index == this.props.question.choiceList.length -1 ) {
            // at the bottom
            this.addNewChoice()
        } else {
            // focus on the one below this one
            $("#" + (this.props.question.choiceList[index + 1].id)).focus()
        }
    },
    addNewChoice: function(){
        this.props.addNewChoice(this.props.question.id)
    },
    componentDidUpdate: function(){
        for (var i = 0; i < this.props.question.choiceList.length; i++) {
            if (this.props.question.choiceList[i].focus) {
                $("#" + this.props.question.choiceList[i].id).focus()
                this.props.question.choiceList[i].focus = false;
            }
        }
    },
    deleteChoice:function(choiceId, index){
        this.props.deleteChoice(this.props.question.id, choiceId, index)
    },
    render: function() {
        return (
            <div className="indi-quiz-form">
                <QuizQuestion 
                    questionText={this.props.question.quizQuestionText}
                    handleQuizQuestionChange={this.handleQuizQuestionChange}/>
                <MCChoiceList 
                    addNewChoice ={this.addNewChoice}
                    handleChoiceTextChange={this.handleChoiceTextChange}
                    choiceList={this.props.question.choiceList}
                    deleteChoice={this.deleteChoice}
                    moveFocusDownOrAddNewChoice={this.moveFocusDownOrAddNewChoice}/>
                <AddOptionButton handleClick={this.addNewChoice}/>
            </div>
        )
    }
})