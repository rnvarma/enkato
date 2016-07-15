require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/QuizForm");
var QuestionList = require('js/globals/QuizView/QuestionList');

import QuizNav from 'js/globals/QuizView/QuizNav';

import FontAwesome from 'react-fontawesome';

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
            uuid: ''
        }
    },
    closeModal: function() {
        this.props.closeModal()
    },
    render:function(){
        return(
            <div className="quizForm">
                <div className="header">
                    Check Your Understanding
                    <FontAwesome className="closeForm" name="close" onClick={this.closeModal}/>
                </div>
                <QuizNav 
                    questions={this.state.questions}/>
                <QuestionList
                    questions={this.state.questions}/>
            </div>
        )
    }
})