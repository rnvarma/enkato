require("css/globals/EditVideoPlayer/EditableTopicList")

var React = require('react')
var ScrollArea = require('react-scrollbar')

var EditableTopicNode = require('js/globals/EditVideoPlayer/EditableTopicNode');
var AddTopicButton = require('js/globals/EditVideoPlayer/AddTopicButton')

module.exports = React.createClass({
    render: function() {
        var topicNodes = this.props.topicObjList.map(function(topic) {
            return (
                <EditableTopicNode
                    key={topic.id}
                    topic={topic}
                    handleTopicClick={this.props.handleTopicClick}
                    updateName={this.props.updateName}
                    handleTopicDelete={this.props.handleTopicDelete}/>
            );
        },this);
        return(
            <div>
                <ScrollArea className="editableTopicList">
                    {topicNodes}
                </ScrollArea>
                <AddTopicButton 
                    addNewTopic={this.props.addNewTopic}/>
            </div>
        )        
    }
})