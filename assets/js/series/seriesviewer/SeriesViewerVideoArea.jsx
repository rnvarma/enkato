require('css/series/seriesviewer/SeriesViewerVideoArea.scss');

import React from 'react';

import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';

class SeriesViewerVideoArea extends React.Component {
  render() {
    if (this.props.currUUID) {
      return (
        <div className="seriesViewerVideoArea">
          <VideoPlayer
            setTopicList={this.props.setTopicList}
            setGetCurrentTime={this.props.setGetCurrentTime}
            videoUUID={this.props.currUUID}
            s_id={this.props.s_id}
            nextVideo={this.props.nextVideo}
          />
        </div>
      );
    } else {
      return (
        <div className="seriesViewerVideoArea loading">
          Loading...
        </div>
      );
    }
  }
}

export default SeriesViewerVideoArea;
