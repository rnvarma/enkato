require('css/series/seriesviewer/SeriesViewerHeader.scss');

import React from 'react';

class SeriesViewerHeader extends React.Component {
    render() {
        return (
            <div className="seriesViewerHeader">
                <div className="seriesName">
                    {this.props.seriesName}
                </div>
                <div className="currVideoName">
                    {this.props.currVideo ? this.props.currVideo.name : ""}
                </div>
            </div>
        );
    }
}

export default SeriesViewerHeader;
