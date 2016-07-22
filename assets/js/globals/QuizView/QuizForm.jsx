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
        console.log("componentDidMount aryyyyy")
        this.setState({currentQuestion:0})
        this.setState({uuid: this.props.videoUUID});
        this.loadDataFromServer(this.props.videoUUID);
        if(this.props.goToReviewMode){
            this.setState({reviewMode:true})
            this.setState({showGradingPage:true})
            console.log("ay")
        } else {
            this.setState({reviewMode:false})
            this.setState({showGradingPage:false})
            console.log("nah")
        }
    },
    componentWillReceiveProps: function(nextProps){
        if (nextProps.videoUUID != this.props.videoUUID)
            this.loadDataFromServer(nextProps.videoUUID)
        if(nextProps.completedQuizInfo.result!=[]){
            this.setState({completedQuizInfo:nextProps.completedQuizInfo})
        }
    },
    getInitialState:function(){
        return {
            questions:[],
            numQuestions: 0,
            uuid: '',
            currentQuestion: 0,
            selectedAnswers:[],
            numQsAnswered:0,
            reviewMode:false,
            showGradingPage:false,
            completedQuizInfo:{
                result:[],
                numCorrect:0
            },
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
    setCurrentQuestion: function(num){
        this.setState({
            currentQuestion: num
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
    submitInfo: function(){
        const payload = {
            selectedAnswers: this.state.selectedAnswers,
        }
        const s_id = $("#s_id").attr("data-sid");
        $.ajax({
          url: "/logquiz/s/"+s_id+"/v/"+this.props.videoUUID,
          dataType: 'json',
          type: 'POST',
          data: payload,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            console.log("data, from submitInfo", data);
            this.setState({
              showGradingPage: true,
              reviewMode: true,
              completedQuizInfo: data,
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    setReviewMode: function(mode){
        this.setState({reviewMode:mode})
        this.setState({currentQuestion:0})
    },
    setShowGradingPage: function(mode){
        this.setState({showGradingPage:mode})
    },
    render:function(){
        var currentQuestionData = this.state.questions[this.state.currentQuestion]
        var currentQuestionResults=[]
        var isLast = (this.state.currentQuestion==this.state.numQuestions-1)
        var modalBody = <div></div>
        var navigation = <div></div>

        if(this.state.reviewMode){
            navigation = <ReviewingQuizNav />
            currentQuestionResults=this.state.completedQuizInfo.result[this.state.currentQuestion]
        } else {
            navigation = (
                <QuizNav 
                    questions={this.state.questions}
                    currentQuestion={this.state.currentQuestion}
                    setQuestion={this.setQuestion}
                />
            )
        }

        if(this.state.showGradingPage){
            modalBody = (
                <CompletedQuizPage 
                    numCorrect={this.state.completedQuizInfo.numCorrect}
                    numQuestions={this.state.numQuestions}
                    setReviewMode={this.setReviewMode}
                    setShowGradingPage={this.setShowGradingPage}
                />
            )
        } else {
            modalBody = (
                <QuestionNode
                  question={currentQuestionData}
                  selectChoice={this.selectChoice}
                  isLast={isLast}
                  numQsAnswered={this.state.numQsAnswered}
                  numQuestions={this.state.numQuestions}
                  selectedAnswer={this.state.selectedAnswers[this.state.currentQuestion]}
                  submitInfo={this.submitInfo}
                  reviewMode={this.state.reviewMode}
                  currentQuestionResults={currentQuestionResults}
                  setCurrentQuestion={this.setCurrentQuestion}
                />
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
            quizExists={Boolean(this.state.questions[this.state.currentQuestion])}
            currentQuestion={this.state.currentQuestion}
            numQuestions={this.state.numQuestions}
            nextQuestion={this.nextQuestion}
            prevQuestion={this.prevQuestion}
            closeModal={this.closeModal}
            showGradingPage={this.state.showGradingPage}
            reviewMode={this.state.reviewMode}
            onFinishButton={this.props.onFinishButton}
          />
        </div>
      );
    }
})