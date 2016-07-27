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
            choiceList:[{choiceText:"", keyCode:makeid()}]
        }
    },
    handleQuizQuestionChange: function(questionText){
        this.props.handleQuizQuestionChange(questionText, this.props.questionNumber)
    },
    handleChoiceTextChange: function(text,index, keyCode){
        var tempChoiceList = this.props.choiceList;
        tempChoiceList[index].choiceText = text;
        this.props.setChoiceList(tempChoiceList, this.props.questionNumber)
        if(text.length==0){
            var this2=this
            $("#"+keyCode).one("keydown",function(event){
                event.preventDefault()
                if(index!==0){
                    this2.deleteChoice(index)
                    var prevKeyCode=this2.props.choiceList[index-1].keyCode
                    $("#"+(prevKeyCode)).focus()
                }
            })
        }
    },
    addNewChoice: function(){
        var tempChoiceList = this.props.choiceList;
        tempChoiceList.push({choiceText:"", keyCode:makeid()})
        this.props.setChoiceList(tempChoiceList, this.props.questionNumber)
        this.props.setShouldRefocus(true,this.props.questionNumber)
    },
    componentDidUpdate: function(){
        if(this.props.shouldRefocus){
            //focus on new option
            var index = this.props.choiceList.length-1
            keyCode = this.props.choiceList[index].keyCode
            $("#"+(keyCode)).focus();
            this.props.setShouldRefocus(false,this.props.questionNumber)
        }
    },
    deleteChoice:function(choiceIndex){
        tempChoiceList = this.props.choiceList
        if(choiceIndex>-1)
            tempChoiceList.splice(choiceIndex,1)
        this.props.setChoiceList(tempChoiceList, this.props.questionNumber)
    },
    render: function() {
        return (
            <div className="indi-quiz-form">
                <QuizQuestion 
                    handleQuizQuestionChange={this.handleQuizQuestionChange}/>
                <MCChoiceList 
                    addNewChoice ={this.addNewChoice}
                    handleChoiceTextChange={this.handleChoiceTextChange}
                    choiceList={this.props.choiceList}
                    deleteChoice={this.deleteChoice}/>
                <AddOptionButton handleClick={this.addNewChoice}/>
            </div>
        )
    }
})

var AddOptionButton = React.createClass({
    render: function(){
        return(
            <Row className="choice-row" onClick={this.props.handleClick}>
                <FontAwesome
                    className='circle-icon' 
                    name='circle-thin'/>
                <span className="add-option-button">Add Option</span>
            </Row>
        )
    }
})

var QuizQuestion = React.createClass({
    handleQuestionTextChange: function(e){
        this.props.handleQuizQuestionChange(e.target.value)
    },
    render: function(){
        return(
            <Row className="question-row">
                    <FontAwesome
                        className='arrow-icon' 
                        name='arrow-right'/>
                <input
                    className="question-input"
                    type="text"
                    placeholder="Question"
                    onChange={this.handleQuestionTextChange}/>
            </Row>
        )
    }
})



var MCChoiceList = React.createClass({
    render: function(){
        var index = -1;//this is okay because everything is local to the host
        var shouldUseX=this.props.choiceList.length!==1
        var MCChoiceNodes = this.props.choiceList.map(function(choice){
            index++;
            return (
                <MCChoiceNode
                    key={choice.keyCode}
                    index={index}
                    keyCode={choice.keyCode}
                    choiceText={choice.choiceText}
                    handleChoiceTextChange={this.props.handleChoiceTextChange}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    shouldUseX={shouldUseX}/>
            )
        },this)
        return (
            <div>
                {MCChoiceNodes}
            </div>
        )
    }
})


var MCChoiceNode = React.createClass({
    handleChoiceTextChange: function(e){
        this.props.handleChoiceTextChange(
            e.target.value,
            this.props.index,
            this.props.keyCode
        )
    },
    submit: function(e){
        e.preventDefault()
        this.props.addNewChoice()
    },
    deleteChoice: function(){
        if(this.props.shouldUseX)
            this.props.deleteChoice(this.props.index)
    },
    render: function(){
        //add 1 to index because its an index // starts @ 0 ! 1
        var placeholder = "Choice "+(this.props.index+1)
        return(
            <form onSubmit={this.submit}>
                <Row className="choice-row">
                    <FontAwesome
                        className='circle-icon' 
                        name='circle-thin'/>
                    <input
                        className="choice-input"
                        type="text"
                        placeholder={placeholder}
                        onChange={this.handleChoiceTextChange}
                        id={this.props.keyCode}/>
                    <FontAwesome 
                        className="timesIcon"
                        name='times'
                        onClick={this.deleteChoice}/>
                    <div type="submit">
                    </div>
                </Row>
            </form>
        )
    }
})

