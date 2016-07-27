require('css/series/seriesviewer/SeriesViewerSidebarVideoPanel.scss');

import React from 'react';
import DotDotDot from 'react-dotdotdot';

import { pluralize } from 'js/globals/utility'

class SeriesViewerSidebarVideoPanel extends React.Component {
    constructor() {
        super();
        
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        window.location.hash = this.props.video.uuid;
    }

    render() {
        let quizQuestionCount;
        if (this.props.video.num_quiz_questions) {
            quizQuestionCount = (
                <div className="numQuizQuestions">
                    {this.props.video.num_quiz_questions} {pluralize("Q", this.props.video.num_quiz_questions)}
                </div>
            );
        }
        return (
            <div
                className={"seriesViewerSidebarVideoPanel" + (this.props.active ? " active" : "")}
                onClick={this.onClick}
                id={"panel-" + this.props.video.uuid}>
                <div className="imageArea">
                    <img src={this.props.video.thumbnail} className="image"/>
                </div>
                <div className="info">
                    <div>
                        <DotDotDot className="name" clamp={this.props.clamp}>
                            {this.props.video.name}
                        </DotDotDot>
                    </div>
                    <div className="metadata">
                        <div className="numTopics">
                            {this.props.video.num_views} {pluralize("view", this.props.video.num_views)}
                        </div>
                        {quizQuestionCount}
                    </div>
                </div>
            </div>
        );
    }
}
SeriesViewerSidebarVideoPanel.defaultProps = {
    clamp: 1,
}

export default SeriesViewerSidebarVideoPanel;
