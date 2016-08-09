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
var SingleQuizForm = require('js/testinggrounds/QuizAddingForm/SingleQuizForm.jsx')



var QuizAddingFormWrapper = React.createClass({
    setChoiceList: function(choiceList, questionNumber){
        var tempQuestionList=this.state.questions
        tempQuestionList[questionNumber-1].choiceList = choiceList
        this.setState({questions:tempQuestionList})
    },
    setShouldRefocus: function(shouldRefocus, questionNumber){
        var tempQuestionList=this.state.questions
        tempQuestionList[questionNumber-1].shouldRefocus = shouldRefocus
        this.setState({questions:tempQuestionList})
    },
    handleQuizQuestionChange: function(questionText, questionNumber){
        var tempQuestionList=this.state.questions
        tempQuestionList[questionNumber-1].quizQuestionText = questionText
        this.setState({questions:tempQuestionList})
    },
    scrollToFromButton: function(e){
        var idNum = e.target.getAttribute("id")[0]
        this.scrollTo(idNum)
    },
    scrollTo: function(idNum){
        console.log(idNum+"---------")
        $('html, body').animate({scrollTop: $("#"+idNum+"q").offset().top}, 500);
    },
    getInitialState:function(){
        return {
            questions:[{
                quizQuestionText:"",
                choiceList:[{choiceText:"", keyCode:"abc"}],
                shouldRefocus:false,
                currentFocus:0,
                keyCode:1
            }],
            numQuestions:1
        }
    },
    addQuestion: function(){
        var n = this.state.numQuestions
        n++;
        this.setState({numQuestions:n})
        var tempQuestionList = this.state.questions
        tempQuestionList.push({
                quizQuestionText:"",
                choiceList:[{choiceText:"", keyCode:"abc"}],
                shouldRefocus:false,
                currentFocus:0,
                keyCode:n
        })
        this.setState({questions:tempQuestionList})
        //have to set delay for this to scroll properly, but won't work for now.
        //this.scrollTo(n) 
    },
    render: function(){
        console.log(this.state)
        return(
            <div>
                <div className="questionNumberButtons">
                    <ScrollButtonList 
                        scrollToFromButton={this.scrollToFromButton}
                        questions={this.state.questions}/>
                    <FontAwesome
                        onClick={this.addQuestion}
                        name='plus'/>
                </div>
                <QuizFormsList 
                    setChoiceList={this.setChoiceList}
                    setShouldRefocus={this.setShouldRefocus}
                    handleQuizQuestionChange={this.handleQuizQuestionChange}
                    questions={this.state.questions}/>
            </div>
        )
    }
})

var QuizFormsList = React.createClass({
    render: function(){
        var counter = 0
        this2 = this
        var QuizFormNodes = this.props.questions.map(function(question){
            counter++;
            return(
                <QuizFormNode
                    key={question.keyCode}
                    keyCode={question.keyCode}
                    handleQuizQuestionChange={this2.props.handleQuizQuestionChange}
                    setShouldRefocus={this2.props.setShouldRefocus}
                    setChoiceList={this2.props.setChoiceList}
                    question={question}/>
            )
        })
        return(
            <div>
                {QuizFormNodes}
            </div>
        )
    }
})

var ScrollButtonList = React.createClass({
    render:function(){
        var this2 = this;
        var ScrollButtonNodes = this.props.questions.map(function(question){
            return (
                <ScrollButtonNode
                    keyCode={question.keyCode}
                    scrollToFromButton={this2.props.scrollToFromButton}
                    key={question.keyCode}/>
            )
        })
        return(
            <div>
                {ScrollButtonNodes}
            </div>
        )
    }
})


var QuizFormNode = React.createClass({
    render: function(){
        return(
            <div id={this.props.keyCode+"q"}>
                <SingleQuizForm 
                    questionNumber={this.props.keyCode}
                    shouldRefocus={this.props.question.shouldRefocus}
                    choiceList={this.props.question.choiceList}
                    handleQuizQuestionChange={this.props.handleQuizQuestionChange}
                    setShouldRefocus={this.props.setShouldRefocus}
                    setChoiceList={this.props.setChoiceList}/>
            </div>
        )
    }
})

var ScrollButtonNode = React.createClass({
    render: function(){
        var keyCode=this.props.keyCode
        return(
            <div>
                <div 
                    id={keyCode+"b"} 
                    onClick={this.props.scrollToFromButton}
                    className="singleNumberButton">
                    {keyCode}
                </div>
            </div>
        )
    }
})


ReactDOM.render(<QuizAddingFormWrapper/>, 
    document.getElementById('page-anchor')
)