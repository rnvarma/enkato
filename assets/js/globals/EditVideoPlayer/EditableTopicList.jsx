require("css/globals/EditVideoPlayer/EditableTopicList")

import React, { Component } from 'react';

import ScrollArea from 'react-scrollbar';

import EditableTopicNode from 'js/globals/EditVideoPlayer/EditableTopicNode';
import AddTopicButton from 'js/globals/EditVideoPlayer/AddTopicButton';
import BulkImportTopics from 'js/globals/EditVideoPlayer/BulkImportTopics'

export default class EditableTopicList extends Component {
    render() {
        var topicNodes = this.props.topicObjList.map(function(topic) {
            return (
                <EditableTopicNode
                    key={topic.id}
                    id={topic.id}
                    topic={topic}
                    handleTopicClick={this.props.handleTopicClick}
                    updateName={this.props.updateName}
                    handleTopicDelete={this.props.handleTopicDelete}
                    playVideo={this.props.playVideo}/>
            );
        },this);
        return(
            <div>
                <ScrollArea className="editableTopicList">
                    {topicNodes}
                    <BulkImportTopics
                        addNewTopic={this.props.addNewTopic}/>
                </ScrollArea>
                <AddTopicButton 
                    addNewTopic={this.props.addNewTopic}/>
            </div>
        )        
    }
}