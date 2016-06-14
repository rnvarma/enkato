require('bootstrap-loader');
require("css/globals/VideoPlayer")

var React = require('react')
var ReactDOM = require('react-dom')

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;




var TopicNode = React.createClass({
    handleTopicClick:function(){
        this.props.handleTopicClick(this.props.id)
    },
    render:function(){
        if(this.props.isCurrentTopic){
            return(
                <div id="selectedTopicNode" className="topicNode" onClick={this.handleTopicClick}>
                    {this.props.name}
                </div>
            )
        } else {
            return(
                <div className="topicNode" onClick={this.handleTopicClick}>
                    {this.props.name}
                </div>
            )
        }
    }
});



module.exports = React.createClass({
    
    render:function(){
        var topicNodes = this.props.topicObjList.map(function(topic) {
            return (
                <TopicNode
                    name={topic.name}
                    key={topic.id}
                    id={topic.id}
                    isCurrentTopic={topic.isCurrentTopic}
                    time={topic.time}
                    handleTopicClick={this.props.handleTopicClick}
                >
                </TopicNode>
            );
        },this);
        return(
            <div className="topicList">
                {topicNodes}
            </div>
        )
    }
});