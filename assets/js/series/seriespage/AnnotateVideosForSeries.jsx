require("css/series/seriespage/AnnotateVideosForSeries.scss");

import React from 'react';

import AnnotateSeriesSideBar from 'js/series/seriespage/AnnotateSeriesSideBar';
import AnnotateSeriesVideoArea from 'js/series/seriespage/AnnotateSeriesVideoArea';

export default class AnnotateVideosForSeries extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentVideo: this.props.data.videos[0]
        };
        this.updateCurrVideo = this.updateCurrVideo.bind(this);
    }

    updateCurrVideo(id) {
        for (var i = 0; this.props.data.videos; i++) {
            if (this.props.data.videos[i].uuid == id) break;
        }
        this.setState({currentVideo: this.props.data.videos[i]});
    }

    render() {
        return (
            <div className="annotateVideosForSeries">
                <AnnotateSeriesSideBar 
                    data={this.props.data}
                    updateCurrVideo={this.updateCurrVideo}
                    currentVideo={this.state.currentVideo}
                />
                <AnnotateSeriesVideoArea
                    data={this.props.data}
                    currentVideo={this.state.currentVideo}
                    quizMode={this.props.quizMode}
                />
            </div>
        );
    }
}
