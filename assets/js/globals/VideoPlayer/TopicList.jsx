require('bootstrap-loader');
require("css/globals/VideoPlayer/TopicList")

import React from 'react';
import ReactDOM from 'react-dom';

import ScrollArea from 'react-scrollbar';

class TopicNode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="topicNode"
                id={(this.props.topic.isCurrentTopic ? "selectedTopicNode" : "")}
                onClick={this.handleTopicClick}
            >
                {this.props.topic.name}
            </div>
        );
    }
}

export default class TopicList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var topicNodes = this.props.topicObjList.map(function(topic) {
            return (
                <TopicNode
                    key={topic.id}
                    topic={topic}
                    handleTopicClick={this.props.handleTopicClick}
                />
            );
        }, this);

        return (
            <ScrollArea className="topicList">
                {(topicNodes.length != 0) ? topicNodes : "No topics"}
            </ScrollArea>
        );
    }
}
