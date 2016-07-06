require('bootstrap-loader');
require('css/globals/VideoPlayer/ProgressBar');

import React from 'react';

import TopicDot from 'js/globals/VideoPlayer/TopicDot'

function updateProgressBar(percentComplete) {
    $(".watched").width(percentComplete + "%");
    $(".notWatched").width((100 - percentComplete) + "%");
}

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleScrub = this.handleScrub.bind(this);
    }

    handleScrub(e) {
        var scrubX = e.pageX - $(".progressBar").offset().left;
        var totalX = $(".progressBar").width();
        var percentOfOne = scrubX * 1.0 / totalX; /* value 0.0 to 1.0 */

        // First, set new width of bar
        updateProgressBar(percentOfOne*100);

        // Second, send data to VideoPlayer
        this.props.handleScrub(percentOfOne)
    }

    render() {
        updateProgressBar(this.props.percentDone);

        /* TODO: add event driven system. Currently an inefficiency, but it works */
        const topicDots = this.props.topicObjList.map(function (topic) {
            return (
                <TopicDot
                key={topic.id}
                topic={topic}
                videoDuration={this.props.videoDuration}
                handleTopicClick={this.props.handleTopicClick}
                />
            );
        }, this);

        return (
            <div className="progressBar" onClick={ this.handleScrub }>
                { topicDots }
                <div className="watched"></div>
                <div className="notWatched"></div>
            </div>
        );
    }
};
