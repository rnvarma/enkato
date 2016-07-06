
require('css/globals/QuizAddingForm/quizaddingform.scss')
var React = require('react')
var ReactDOM = require('react-dom')
 
var getCookie = require('js/globals/GetCookie')

var FontAwesome = require('react-fontawesome');
var ScrollArea = require('react-scrollbar')

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Row = require('react-bootstrap').Row;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;
var FontAwesome = require('react-fontawesome');

var SingleQuizForm = require('js/globals/QuizAddingForm/SingleQuizForm.jsx')
var QuizFormsList = require('js/globals/QuizAddingForm/QuizFormsList');
var ScrollButtonList = require('js/globals/QuizAddingForm/ScrollButtonList');

module.exports = React.createClass({
    loadDataFromServer: function(vuuid){
        $.ajax({
          url: "/api/quizdata/" + vuuid,
          dataType: 'json',
          cache: false,
          success: function(data) {
            console.log(data)
            this.setState(data)
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    saveDataToServer: function(){
        var data = {
            'questions': JSON.stringify(this.state.questions)
        }
        $.ajax({
          url: "/v/" + this.state.uuid + "/updatequiz",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            console.log("yay we done")
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    setChoiceList: function(choiceList, questionNumber){
        var tempQuestionList = this.state.questions
        tempQuestionList[questionNumber].choiceList = choiceList
        this.setState({questions: tempQuestionList})
    },
    setShouldRefocus: function(shouldRefocus, questionNumber){
        var tempQuestionList = this.state.questions
        tempQuestionList[questionNumber - 1].shouldRefocus = shouldRefocus
        this.setState({questions: tempQuestionList})
    },
    handleQuizQuestionChange: function(questionText, index){
        var tempQuestionList = this.state.questions
        tempQuestionList[index].quizQuestionText = questionText
        this.setState({questions: tempQuestionList})
    },
    scrollToFromButton: function(idNum, index){
        var height = $("#" + idNum + "q").height()
        var scrollTop = height * index
        $(".quizAddingForm").animate({scrollTop: scrollTop}, 500);
        var tempQuestionList = this.state.questions
        for (var i = 0; i < tempQuestionList.length; i++) {
          tempQuestionList[i].active = false;
        }
        tempQuestionList[index].active = true
        this.setState({questions: tempQuestionList})
    },
    componentDidMount: function(){
        this.setState({uuid: this.props.videoUUID})
        this.loadDataFromServer(this.props.videoUUID);
        $(window).unload(this.saveDataToServer)
    },
    componentWillUnmount: function() {
        this.saveDataToServer();
    },
    componentWillReceiveProps: function(nextProps) {
        if (this.state.uuid != nextProps.videoUUID) {
            this.saveDataToServer()
            this.setState({uuid: nextProps.videoUUID})
            this.loadDataFromServer(nextProps.videoUUID);
        }
    },
    getInitialState:function(){
        return {
            questions:[{
                text: "",
                choiceList: [{text:"", id:0}],
                shouldRefocus: false,
                currentFocus: 0,
                id: 1,
                new: true
            }],
            numQuestions: 1,
            uuid: ''
        }
    },
    addNewChoice: function(qid) {
        var data = {
            qid: qid
        }
        $.ajax({
          url: "/v/" + this.state.uuid + "/addquizoption",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                var questions = this.state.questions
                for (var i = 0; i < questions.length; i++) {
                    if (questions[i].id == qid) {
                        questions[i].choiceList.push(data.new_choice)
                        break;
                    }
                }
                this.setState({questions: questions})
            } else {
                console.log("Internal Server Error: Adding Quiz Option Failed")
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    deleteChoice: function(qid, cid, index) {
        var data = {
            qid: qid,
            cid: cid
        }
        $.ajax({
          url: "/v/" + this.state.uuid + "/deletequizoption",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                var questions = this.state.questions
                for (var i = 0; i < questions.length; i++) {
                    if (questions[i].id == data.qid) {
                        for (var j = 0; j < questions[i].choiceList.length; j++) {
                            if (questions[i].choiceList[j].id == cid) {
                                questions[i].choiceList[j - 1].focus = true;
                                questions[i].choiceList.splice(j, 1)
                                break;
                            }
                        }
                        break;
                    }
                }
                this.setState({questions: questions})
            } else {
                console.log("Internal Server Error: Adding Quiz Option Failed")
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    addQuestion: function() {
        var data = this.state;
        $.ajax({
          url: "/v/" + this.state.uuid + "/addquizquestion",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                var questions = this.state.questions
                questions.push(data.new_question)
                this.setState({questions: questions})
            } else {
                console.log("Internal Server Error: Adding Quiz Question Failed")
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    makeChoiceIsCorrect: function(cid, qIndex) {
        var tempQuestionList = this.state.questions
        for (var i = 0; i < tempQuestionList[qIndex].choiceList.length; i++) {
            if (tempQuestionList[qIndex].choiceList[i].id == cid) {
                tempQuestionList[qIndex].choiceList[i].is_correct = true;
            } else {
                tempQuestionList[qIndex].choiceList[i].is_correct = false;
            }
        }
        this.setState({questions: tempQuestionList})
    },
    render: function(){
        return(
            <div className="quizAddingForm">
                <div className="questionNumberButtons">
                    <ScrollButtonList 
                        scrollToFromButton={this.scrollToFromButton}
                        questions={this.state.questions}/>
                    <FontAwesome
                        className="addQuestionButton"
                        onClick={this.addQuestion}
                        name='plus'/>
                </div>
                <QuizFormsList 
                    setChoiceList={this.setChoiceList}
                    setShouldRefocus={this.setShouldRefocus}
                    handleQuizQuestionChange={this.handleQuizQuestionChange}
                    addNewChoice={this.addNewChoice}
                    deleteChoice={this.deleteChoice}
                    makeChoiceIsCorrect={this.makeChoiceIsCorrect}
                    scrollToFromButton={this.scrollToFromButton}
                    questions={this.state.questions}/>
            </div>
        )
    }
})
