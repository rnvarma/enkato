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
                <div className="seriesCreator">
                    by <a className="name" href={"/userprofile/" + this.props.seriesCreator.user_id}>{this.props.seriesCreator.name}</a>
                </div>
            </div>
        );
    }
}

export default SeriesViewerHeader;
