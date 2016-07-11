require('css/series/seriesviewer/SerivesViewerSidebarVideoPanel.scss');

import React from 'react';

import { pluralize, truncate } from 'js/globals/utility'

class SerivesViewerSidebarVideoPanel extends React.Component {
    constructor() {
        super()
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        window.location.hash = this.props.video.uuid
    }

    render() {
        return (
            <div className="serivesViewerSidebarVideoPanel" onClick={this.onClick}>
                <div className="imageArea">
                    <img src={this.props.video.thumbnail} className="image"/>
                </div>
                <div className="info">
                    <div className="name">
                        {truncate(this.props.video.name, 35, true)}
                    </div>
                    <div className="author">
                        by <a className="name" href={"/userprofile/" + this.props.video.creator.user_id}>{this.props.video.creator.name}</a>
                    </div>
                    <div className="metadata">
                        <div className="numTopics">
                            {this.props.video.num_topics} {pluralize("topic", this.props.video.num_topics)}
                        </div>
                        <div className="numQuizQuestions">
                            {this.props.video.num_quiz_questions} {pluralize("Q", this.props.video.num_quiz_questions)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SerivesViewerSidebarVideoPanel;
