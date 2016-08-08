import React, { Component } from 'react';

import ScrollArea from 'react-scrollbar';

import EditableTopicNode from 'js/globals/EditVideoPlayer/EditableTopicNode';
import AddTopicButton from 'js/globals/EditVideoPlayer/AddTopicButton';
import BulkImportTopics from 'js/globals/EditVideoPlayer/BulkImportTopics'

export default class EditableTopicList extends Component {
    render() {
        const nodes = this.props.topicObjList.map((node) => {
            if (node.type && node.type === 'breakpoint') {
                return (
                    <div>
                        {node.clean_time} - {node.text}
                    </div>
                );
            } else {
                return (
                    <EditableTopicNode
                        key={node.id}
                        id={node.id}
                        topic={node}
                        handleTopicClick={this.props.handleTopicClick}
                        updateName={this.props.updateName}
                        handleTopicDelete={this.props.handleTopicDelete}
                        playVideo={this.props.playVideo}/>
                );
            }
        });

        return(
            <div>
                <ScrollArea className="editableTopicList">
                    {nodes}
                    <BulkImportTopics
                        addNewTopic={this.props.addNewTopic}
                        videoDuration={this.props.videoDuration}/>
                </ScrollArea>
                <button onClick={this.props.addBreakpoint}>Add Breakpoint</button>
                <AddTopicButton 
                    addNewTopic={this.props.addNewTopic}/>
            </div>
        )        
    }
}