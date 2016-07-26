import React, { Component } from 'react';
import { Link } from 'react-router';

import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';

class SeriesAnalyticsDisplay extends Component {
    render() {
        const { series } = this.props;
        const analysis = series.user_data[0].analysis;
        return (
            <div className="seriesAnalyticsDisplay">
                <div className="seriesPreview">
                    <img src={series.image || ''} />
                </div>
                <div className="seriesAnalysis">
                    { Math.round(analysis.watched / series.video_count * 100) }% watched
                    { Math.round(analysis.completed / series.video_count * 100) }% completed
                </div>
                <Link to={`/s/${series.uuid}/watch#${series.user_data[0].videos_data[analysis.continue_video].video_uuid}`}>
                    Continue Learning
                </Link>
            </div>
        );
    }
}

export default SeriesAnalyticsDisplay;