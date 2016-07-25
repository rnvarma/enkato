require('css/series/seriespage/SeriesVideoList.scss');

import React, { Component } from 'react';

import SeriesVideoPanel from 'js/series/seriespage/SeriesVideoPanel';

export default class SeriesVideoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var videoPanels = this.props.videos.map(function(v) {
            return (
                <SeriesVideoPanel
                    key={v.order}
                    video={v}
                    seriesUUID={this.props.seriesUUID}
                    is_creator={this.props.is_creator}/>
            );
        }.bind(this))
        return (
            <div className="seriesVideoList">
                {videoPanels}
            </div>
        );
    }
}
