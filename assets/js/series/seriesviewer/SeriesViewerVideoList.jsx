require('css/series/seriesviewer/SeriesViewerVideoList.scss');

import React from 'react';

import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';

class SeriesViewerVideoList extends React.Component {
    render() {
        var videoPanels = this.props.videos.map(function(video) {
            var active;
            if (video.uuid == this.props.currUUID) active=true;
            return (
                <SeriesViewerSidebarVideoPanel
                    clamp="2"
                    video={video}
                    key={video.uuid}
                    active={active} />
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
