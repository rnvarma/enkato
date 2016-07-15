require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/QuizForm");
var QuestionList = require('js/globals/QuizView/QuestionList');
var QuestionNode = require('js/globals/QuizView/QuestionNode');

import QuizNav from 'js/globals/QuizView/QuizNav';
import QuizNavFooter from 'js/globals/QuizView/QuizNavFooter';

import FontAwesome from 'react-fontawesome';

module.exports = React.createClass({
    loadDataFromServer: function(vuuid){
        $.ajax({
          url: "/api/quizdata/" + vuuid,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState(data)
            this.setState({
                currentQuestion: 0
            })
            this.setState({selectedAnswers:new Array(data.numQuestions)})
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    componentDidMount: function(){
        this.setState({uuid: this.props.videoUUID})
        this.loadDataFromServer(this.props.videoUUID);
    },
    componentWillReceiveProps: function(nextProps){
        if (nextProps.videoUUID != this.props.videoUUID)
            this.loadDataFromServer(nextProps.videoUUID)
    },
    getInitialState:function(){
        return {
            questions:[],
            numQuestions: 0,
            uuid: '',
            currentQuestion: 0,
            selectedAnswers:[],
            numQsAnswered:0
        }
    },
    closeModal: function() {
        this.props.closeModal()
    },
    nextQuestion: function() {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
    },
    prevQuestion: function() {
        this.setState({
            currentQuestion: this.state.currentQuestion - 1
        })
    },
    selectChoice: function(choiceIndex){
        var tempChoiceList = this.state.selectedAnswers
        if(choiceIndex==tempChoiceList[this.state.currentQuestion]){
            tempChoiceList[this.state.currentQuestion] = null
        } else {
            tempChoiceList[this.state.currentQuestion] = choiceIndex
        }
        this.setState({selectedAnswers:tempChoiceList}, this.setNumQsAnswered)

    },
    setNumQsAnswered:function(){
        var count = 0
        for (var i = this.state.selectedAnswers.length - 1; i >= 0; i--) {
            if(this.state.selectedAnswers[i] != null){
                count++;
            }
        }
        this.setState({numQsAnswered:count})
    },
    setQuestion: function(qNum){
        this.setState({currentQuestion:qNum})
    },
    render:function(){
        var currentQuestionData = this.state.questions[this.state.currentQuestion]
        var isLast = (this.state.currentQuestion==this.state.numQuestions-1)
        return(
            <div className="quizForm">
                <div className="header">
                    Check Your Understanding
                    <FontAwesome className="closeForm" name="close" onClick={this.closeModal}/>
                </div>
                <QuizNav 
                    questions={this.state.questions}
                    currentQuestion={this.state.currentQuestion}
                    setQuestion={this.setQuestion}/>
                <QuestionNode
                    question={currentQuestionData}
                    selectChoice={this.selectChoice}
                    isLast={isLast}
                    numQsAnswered={this.state.numQsAnswered}
                    numQuestions={this.state.numQuestions}
                    selectedAnswer={this.state.selectedAnswers[this.state.currentQuestion]}/>
                <QuizNavFooter
                    currentQuestion={this.state.currentQuestion}
                    numQuestions={this.state.numQuestions}
                    nextQuestion={this.nextQuestion}
                    prevQuestion={this.prevQuestion}
                    closeModal={this.closeModal} />
            </div>
        )
    }
})