import React from 'react';
import { Link } from 'react-router';

import { truncate } from 'js/globals/utility'

class SeriesViewerHeader extends React.Component {
    render() {
        return (
            <div className="seriesViewerHeader">
                <div className="seriesName title">
                    {truncate(this.props.seriesName, 50, true)}
                </div>
                <div className="seriesCreator">
                    by <Link className="name" to={"/userprofile/" + this.props.seriesCreator.user_id}>{this.props.seriesCreator.name}</Link>
                </div>
            </div>
        );
    }
}

export default SeriesViewerHeader;
