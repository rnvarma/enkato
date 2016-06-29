require('bootstrap-loader');
require("css/globals/VideoPlayer/TopicList")
var React = require('react')
var ReactDOM = require('react-dom')
var ScrollArea = require('react-scrollbar')


var TopicNode = React.createClass({
    handleTopicClick:function(){
        this.props.handleTopicClick(this.props.topic.id, this.props.topic.time)
    },
    render:function(){
        if(this.props.topic.isCurrentTopic){
            return(
                <div id="selectedTopicNode" className="topicNode" onClick={this.handleTopicClick}>
                    {this.props.topic.name}
                </div>
            )
        } else {
            return(
                <div className="topicNode" onClick={this.handleTopicClick}>
                    {this.props.topic.name}
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
                    key={topic.id}
                    topic={topic}
                    handleTopicClick={this.props.handleTopicClick}
                >
                </TopicNode>
            );
        },this);
        return(
            <ScrollArea className="topicList">
                {topicNodes}
            </ScrollArea>
        )
    }
});