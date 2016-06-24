require('bootstrap-loader');
require("css/globals/VideoPlayer/TopicList")
var React = require('react')
var ReactDOM = require('react-dom')
var ScrollArea = require('react-scrollbar')


var TopicNode = React.createClass({
    handleTopicClick:function(){
        this.props.handleTopicClick(this.props.id, this.props.time)
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
            <ScrollArea className="topicList">
                {topicNodes}
            </ScrollArea>
        )
    }
});