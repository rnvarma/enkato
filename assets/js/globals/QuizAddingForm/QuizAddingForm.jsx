require('css/globals/QuizAddingForm/quizaddingform.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { getCookie } from 'js/globals/utility';

import FontAwesome from 'react-fontawesome';
import ScrollArea from 'react-scrollbar';

import { Row, Form, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';

import SingleQuizForm from 'js/globals/QuizAddingForm/SingleQuizForm';
import QuizFormsList from 'js/globals/QuizAddingForm/QuizFormsList';
import ScrollButtonList from 'js/globals/QuizAddingForm/ScrollButtonList';

module.exports = React.createClass({
    loadDataFromServer: function(vuuid){
        $.ajax({
          url: "/api/quizdata/" + vuuid,
          dataType: 'json',
          cache: false,
          success: function(data) {
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
    deleteChoice: function(qid, cid, qIndex, cIndex) {
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
                questions[qIndex].choiceList.splice(cIndex, 1)
                if (cIndex > 0) 
                    questions[qIndex].choiceList[cIndex].focus = true;
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
                this.scrollToFromButton(data.new_question.id, questions.length - 1)
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
    deleteQuestion: function(qid, qIndex) {
        var data = {
            qid: qid
        }
        $.ajax({
          url: "/v/" + this.state.uuid + "/deletequizquestion",
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
                questions.splice(qIndex, 1)
                this.setState({questions: questions})
                if (qIndex > 0) {
                    var newQuestionID = questions[qIndex - 1].id
                    this.scrollToFromButton(newQuestionID, qIndex - 1)
                }
            } else {
                console.log("Internal Server Error: Deleting Quiz Question Failed")
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        let height = $('.quizAddingForm').height() - 10;
        return (
            <div className="quizAddingForm">
                <div className="questionNumberButtons" style={{height}}>
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
                    deleteQuestion={this.deleteQuestion}
                    makeChoiceIsCorrect={this.makeChoiceIsCorrect}
                    scrollToFromButton={this.scrollToFromButton}
                    questions={this.state.questions}/>
            </div>
        )
    }
})
