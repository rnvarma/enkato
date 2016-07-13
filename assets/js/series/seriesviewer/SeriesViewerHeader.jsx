require('css/series/seriesviewer/SeriesViewerHeader.scss');

import React from 'react';

import { truncate } from 'js/globals/utility'

class SeriesViewerHeader extends React.Component {
    render() {
        return (
            <div className="seriesViewerHeader">
                <div className="seriesName">
                    {truncate(this.props.seriesName, 50, true)}
                </div>
                <div className="currVideoName">
                    {this.props.currVideo ? truncate(this.props.currVideo.name, 25, true) : ""}
                </div>
            </div>
        );
    }
}

export default SeriesViewerHeader;
