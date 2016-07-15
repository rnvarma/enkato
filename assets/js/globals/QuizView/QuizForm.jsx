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
            questions:[{
                text: "",
                choiceList: [{text:"", id:0}],
                shouldRefocus: false,
                currentFocus: 0,
                id: 1,
                new: true
            }],
            numQuestions: 1,
            uuid: '',
            currentQuestion: 0
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
    render:function(){
        var currentQuestionData = this.state.questions[this.state.currentQuestion]
        return(
            <div className="quizForm">
                <div className="header">
                    Check Your Understanding
                    <FontAwesome className="closeForm" name="close" onClick={this.closeModal}/>
                </div>
                <QuizNav 
                    questions={this.state.questions}
                    currentQuestion={this.state.currentQuestion}/>
                <QuestionNode
                    question={currentQuestionData}/>
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