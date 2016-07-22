require('bootstrap-loader');
var React = require('react');
import getCookie from 'js/globals/GetCookie';
require("css/globals/QuizView/QuizForm");
var QuestionNode = require('js/globals/QuizView/QuestionNode');
var ReviewingQuizNav = require("js/globals/QuizView/ReviewingQuizView/ReviewingQuizNav")
var CompletedQuizPage = require("js/globals/QuizView/ReviewingQuizView/CompletedQuizPage")

import QuizNav from 'js/globals/QuizView/QuizNav';
import QuizNavFooter from 'js/globals/QuizView/QuizNavFooter';

import FontAwesome from 'react-fontawesome';

module.exports = React.createClass({
    getInitialState:function(){
        return {
            currentQuestion: 0,
            selectedAnswers: [],
            numQsAnswered: 0,
        }
    },
    closeModal: function() {
        this.props.closeModal()
    },
    nextQuestion: function() {
        if (this.state.currentQuestion < this.props.questions.length - 1) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
        }
    },
    prevQuestion: function() {
        if (this.state.currentQuestion > 0) {
            this.setState({
                currentQuestion: this.state.currentQuestion - 1
            })
        }
    },
    setCurrentQuestion: function(num){
        this.setState({
            currentQuestion: num
        })
    },
    selectChoice: function(choiceIndex){
        var tempChoiceList = this.state.selectedAnswers
        if(choiceIndex == tempChoiceList[this.state.currentQuestion]){
            tempChoiceList[this.state.currentQuestion] = null
        } else {
            tempChoiceList[this.state.currentQuestion] = choiceIndex
        }
        this.setState({selectedAnswers: tempChoiceList}, this.setNumQsAnswered)

    },
    setNumQsAnswered:function(){
        var count = 0
        for (var i = this.state.selectedAnswers.length - 1; i >= 0; i--) {
            if(this.state.selectedAnswers[i] != null){
                count++;
            }
        }
        this.setState({numQsAnswered: count})
    },
    setQuestion: function(qNum){
        this.setState({currentQuestion: qNum})
    },
    submitInfo: function(){
        const payload = {
            selectedAnswers: this.state.selectedAnswers,
        }
        this.props.submitQuizAnswers(payload)
        this.setState(this.getInitialState())
        this.props.showResultsPage()
    },
    render:function(){
        var currentQuestionData = this.props.questions[this.state.currentQuestion]
        var currentQuestionResults=[]
        var isLast = (this.state.currentQuestion == this.props.questions.length - 1)
        var modalBody = <div></div>
        var navigation = <div></div>

        if(this.props.reviewMode){
            navigation = (
                <ReviewingQuizNav
                    questions={this.props.questions}
                    currentQuestion={this.state.currentQuestion}
                    setQuestion={this.setQuestion}
                    quizResults={this.props.completedQuizInfo.result}/>
            )
            currentQuestionResults = this.props.completedQuizInfo.result[this.state.currentQuestion]
        } else if (!this.props.resultsPage){
            navigation = (
                <QuizNav 
                    questions={this.props.questions}
                    currentQuestion={this.state.currentQuestion}
                    setQuestion={this.setQuestion}/>
            )
        }

        if(this.props.resultsPage){
            console.log(this.props.completedQuizInfo)
            modalBody = (
                <CompletedQuizPage 
                    numCorrect={this.props.completedQuizInfo.numCorrect}
                    numQuestions={this.props.questions.length}
                    showReviewMode={this.props.showReviewMode}
                    onRetakeQuiz={this.props.onRetakeQuiz}/>
            )
        } else {
            modalBody = (
                <QuestionNode
                  question={currentQuestionData}
                  selectChoice={this.selectChoice}
                  isLast={isLast}
                  numQsAnswered={this.state.numQsAnswered}
                  numQuestions={this.props.questions.length}
                  selectedAnswer={this.state.selectedAnswers[this.state.currentQuestion]}
                  submitInfo={this.submitInfo}
                  reviewMode={this.props.reviewMode}
                  currentQuestionResults={currentQuestionResults}
                  setCurrentQuestion={this.setCurrentQuestion}/>
            )
        }
      return (
        <div className="quizForm">
          <div className="header">
            Check Your Understanding
            <FontAwesome className="closeForm" name="close" onClick={this.closeModal}/>
                </div>
          {navigation}
          {modalBody}
          <QuizNavFooter
            quizExists={Boolean(this.props.questions[this.state.currentQuestion])}
            currentQuestion={this.state.currentQuestion}
            numQuestions={this.props.questions.length}
            numQsAnswered={this.state.numQsAnswered}
            nextQuestion={this.nextQuestion}
            prevQuestion={this.prevQuestion}
            closeModal={this.closeModal}
            showGradingPage={this.props.resultsPage}
            reviewMode={this.props.reviewMode}
            onFinishButton={this.props.onFinishButton}
          />
        </div>
      );
    }
})