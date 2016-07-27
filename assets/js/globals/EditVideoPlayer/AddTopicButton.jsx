import React, { Component } from 'react';

export default class AddTopicButton extends Component {
    constructor() {
        super()
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.addNewTopic();
    }

    render() {
        return (
            <div className="addTopicButton" onClick={this.onClick}>
                Add a New Topic
            </div>
        );
    }
}