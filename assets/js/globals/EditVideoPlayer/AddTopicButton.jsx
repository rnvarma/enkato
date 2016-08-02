require('css/globals/EditVideoPlayer/AddTopicButton.scss')

import React, { Component } from 'react';

export default class AddTopicButton extends Component {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.addNewTopic();
    }

    render() {
        return (
            <div className="addTopicButton" onClick={this.onClick}>
                Add a New Topic
            </div>
        )
    }
}