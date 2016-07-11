require('bootstrap-loader');
require("css/globals/VideoPlayer/TopicList")

import React from 'react';

import ScrollArea from 'react-scrollbar';

class TopicNode extends React.Component {
    constructor(props) {
        super(props);
        this.handleTopicClick = this.handleTopicClick.bind(this);
    }

    handleTopicClick() {
        this.props.handleTopicClick(this.props.topic.id, this.props.topic.time);
    }

    render() {
        return (
            <div
                className="topicNode"
                id={(this.props.topic.isCurrentTopic ? "selectedTopicNode" : "")}
                onClick={this.handleTopicClick}
            >
                <div className="time">
                    {this.props.topic.time_clean}
                </div>
                <div className="nameContainer">
                    <div className="name">
                        {this.props.topic.name}
                    </div>
                </div>
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
                    handleTopicClick={this.props.handleTopicClick}/>
            );
        }, this);

        return (
            <ScrollArea className="topicList">
                {topicNodes}
            </ScrollArea>
        );
    }
}
