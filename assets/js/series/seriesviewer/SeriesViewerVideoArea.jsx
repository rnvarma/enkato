import React from 'react';

import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';

class SeriesViewerVideoArea extends React.Component {
    render() {
      if (this.props.currUUID) {
        return (
        <div className="seriesViewerVideoArea">
          <VideoPlayer
              openRegisterModal={this.props.openRegisterModal}
              setStartTime= {this.props.setStartTime}
              setTopicList={this.props.setTopicList}
              loadQuiz= {this.props.loadQuiz}
              setGetCurrentTime={this.props.setGetCurrentTime}
              videoUUID={this.props.currUUID}
              seriesUUID={this.props.seriesUUID}
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
