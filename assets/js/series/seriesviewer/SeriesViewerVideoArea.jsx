require('css/series/seriesviewer/SeriesViewerVideoArea.scss');

import React from 'react';

import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';

class SeriesViewerVideoArea extends React.Component {
    render() {
        if (this.props.currUUID) {
            return (
                <div className="seriesViewerVideoArea">
                    <VideoPlayer 
                        videoUUID={this.props.currUUID}
                        s_id={this.props.s_id}/>
                </div>
            );
        } else {
            return (
                <div className="seriesViewerVideoArea">
                    Loading..
                </div>
            )
        }
    }
}

export default SeriesViewerVideoArea;
