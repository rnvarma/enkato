import React from 'react';

import ScrollArea from 'react-scrollbar';
import TakeQuizButton from 'js/globals/videoPlayer/TakeQuizButton';
import ScrollingOverflow from 'js/globals/ScrollingOverflow';

class TopicNode extends React.Component {
    render() {
        return (
            <a href={`javascript: yt.www.watch.player.seekTo(${this.props.topic.time});`}>
                <div
                    className="topicNode"
                    id={((this.props.topic.isCurrentTopic&&!this.props.showingQuiz) ? "selectedTopicNode" : "")}
                >
                    <div className="time">
                        {this.props.topic.time_clean}
                    </div>
                    <div className="name">
                        <ScrollingOverflow
                            text={this.props.topic.name}
                            elementSize={"80%"}/>
                    </div>
                </div>
            </a>
        );
    }
}

export default class TopicList extends React.Component {
    render() {
        const topicNodes = this.props.topicObjList.map((topic) => {
            return (
                <TopicNode
                    key={topic.id}
                    topic={topic}
                />
            );
        }, this);

        return (
            <ScrollArea className="topicList">
                {topicNodes}
            </ScrollArea>
        );
    }
}
