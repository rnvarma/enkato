require('css/series/seriesviewer/SeriesViewerVideoList.scss');

import React from 'react';

import SerivesViewerSidebarVideoPanel from 'js/series/seriesviewer/SerivesViewerSidebarVideoPanel';

class SeriesViewerVideoList extends React.Component {
    render() {
        var videoPanels = this.props.videos.map(function(video) {
            return (
                <SerivesViewerSidebarVideoPanel
                    video={video}
                    key={video.uuid} />
            )
        }.bind(this))
        return (
            <div className="seriesViewerVideoList">
                {videoPanels}
            </div>
        );
    }
}

export default SeriesViewerVideoList;
