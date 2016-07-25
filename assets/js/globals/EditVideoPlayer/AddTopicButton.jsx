require('css/globals/EditVideoPlayer/AddTopicButton.scss')

import React, { Component } from 'react';

export default class AddTopicButton extends Component {
    render() {
        return (
            <div className="addTopicButton" onClick={this.props.addNewTopic}>
                Add a New Topic
            </div>
        )
    }
}