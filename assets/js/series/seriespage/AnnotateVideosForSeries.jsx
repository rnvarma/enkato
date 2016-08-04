require('css/series/seriespage/AnnotateVideosForSeries.scss');

import React, { Component } from 'react';

import AnnotateSeriesSideBar from 'js/series/seriespage/AnnotateSeriesSideBar';
import AnnotateSeriesVideoArea from 'js/series/seriespage/AnnotateSeriesVideoArea';

export default class AnnotateVideosForSeries extends Component {
    constructor() {
        super();

        this.state = {
            currentVideo: null,
        };
        this.updateCurrentVideo = this.updateCurrentVideo.bind(this);
        this.updateCurrVideo = this.updateCurrVideo.bind(this);
    }

    /* wrapper to stop change if edits need to be saved still */
    updateCurrentVideo(id) {
        if (this.props.unsavedTopics || this.props.unsavedQuiz) {
            this.props.launchUnsaved(this.updateCurrVideo.bind(null, id));
        } else {
            this.updateCurrVideo(id);
        }
    }

    updateCurrVideo(id) {
        for (var i = 0; this.props.videos; i++) {
            if (this.props.videos[i].uuid == id) break;
        }
        this.setState({currentVideo: this.props.videos[i]});
    }

    render() {
        const video = (this.state.currentVideo != null) ? this.state.currentVideo : this.props.videos[0];
        if (!video) return <div>"loading..."</div>
        return (
            <div className="annotateVideosForSeries">
            <AnnotateSeriesSideBar
                videos={this.props.videos}
                updateCurrVideo={this.updateCurrentVideo}
                currentVideo={video}/>
            <AnnotateSeriesVideoArea
                currentVideo={video}
                quizMode={this.props.quizMode}
                publishTopics={this.props.publishTopics}
                publishQuiz={this.props.publishQuiz}
                setUnsavedTopics={this.props.setUnsavedTopics}
                setUnsavedQuiz={this.props.setUnsavedQuiz}
                closeAnnotationModal={this.props.closeAnnotationModal}/>
        </div>
        );
    }
}
