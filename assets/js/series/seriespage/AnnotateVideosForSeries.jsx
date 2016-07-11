require("css/series/seriespage/AnnotateVideosForSeries.scss");

import React from 'react';

import AnnotateSeriesSideBar from 'js/series/seriespage/AnnotateSeriesSideBar';
import AnnotateSeriesVideoArea from 'js/series/seriespage/AnnotateSeriesVideoArea';

export default class AnnotateVideosForSeries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentVideo: null,
    };
    this.updateCurrVideo = this.updateCurrVideo.bind(this);
  }

  updateCurrVideo(id) {
    for (var i = 0; this.props.videos; i++) {
      if (this.props.videos[i].uuid == id) break;
    }
    this.setState({currentVideo: this.props.videos[i]});
  }

  render() {
    console.log("RENDERING");
    const video = (this.state.currentVideo != null) ? this.state.currentVideo : this.props.videos[0];
    console.log("Here is the video set up", video, this.state.currentVideo, this.props, this.props.videos[0]);
    return (
      <div className="annotateVideosForSeries">
        <AnnotateSeriesSideBar
          videos={this.props.videos}
          updateCurrVideo={this.updateCurrVideo}
          currentVideo={video}
        />
        <AnnotateSeriesVideoArea
          currentVideo={video}
          quizMode={this.props.quizMode}
        />
      </div>
    );
  }
}
