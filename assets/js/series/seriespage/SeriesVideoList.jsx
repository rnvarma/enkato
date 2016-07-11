require('css/series/seriespage/SeriesVideoList.scss');

import React from 'react';

import SeriesVideoPanel from 'js/series/seriespage/SeriesVideoPanel';

export default class SeriesVideoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var videoPanels = this.props.videos.map(function(v) {
            return (
                <SeriesVideoPanel key={v.order} video={v}/>
            );
        })
        return (
            <div className="seriesVideoList">
                {videoPanels}
            </div>
        );
    }
}
