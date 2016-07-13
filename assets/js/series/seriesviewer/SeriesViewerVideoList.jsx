require('css/series/seriesviewer/SeriesViewerVideoList.scss');

import React from 'react';

import SerivesViewerSidebarVideoPanel from 'js/series/seriesviewer/SerivesViewerSidebarVideoPanel';

class SeriesViewerVideoList extends React.Component {
    render() {
        var videoPanels = this.props.videos.map(function(video) {
            var active;
            if (video.uuid == this.props.currUUID) active=true;
            return (
                <SerivesViewerSidebarVideoPanel
                    video={video}
                    key={video.uuid}
                    active={active}ß/>
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
