import React from 'react';

export default class TopicDot extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.handleTopicClick(this.props.topic.id, this.props.topic.time);
    }

    render() {
        return (
            <div
                className="topicDot"
                onClick={this.onClick}
                style={{left: this.props.topic.time / this.props.videoDuration * 100 + "%" }}>
            </div>
        );
    }
}
