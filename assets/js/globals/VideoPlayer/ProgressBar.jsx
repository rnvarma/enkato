require('bootstrap-loader');
require('css/globals/VideoPlayer/ProgressBar');

import React from 'react';

import TopicDot from 'js/globals/VideoPlayer/TopicDot'

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleScrub = this.handleScrub.bind(this);
    }

    handleScrub(e) {
        var scrubX = e.pageX - $(".progressBar").offset().left;
        var totalX = $(".progressBar").width();
        var percentOfOne = scrubX * 1.0 / totalX; /* value 0.0 to 1.0 */

        // send data to VideoPlayer
        this.props.handleScrub(percentOfOne)
    }

    render() {
        var watchedWidth = this.props.percentDone + "%"
        var unwatchedWidth = (100 - this.props.percentDone) + "%"

        /* TODO: add event driven system. Currently an inefficiency, but it works */
        const topicDots = this.props.topicObjList.map(function (topic) {
            return (
                <TopicDot
                    key={topic.id}
                    topic={topic}
                    videoDuration={this.props.videoDuration}
                    handleTopicClick={this.props.handleTopicClick}/>
            );
        }, this);

        return (
            <div className="progressBar" onClick={ this.handleScrub }>
                { topicDots }
                <div className="watched" style={{width: watchedWidth}}></div>
                <div className="notWatched" style={{width: unwatchedWidth}}></div>
            </div>
        );
    }
};
