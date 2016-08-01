require('css/series/seriespage/SeriesVideoList.scss');

import React, { Component } from 'react';

import SeriesVideoPanel from 'js/series/seriespage/SeriesVideoPanel';

export default class SeriesVideoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const videoPanels = this.props.videos.map((v, index) => {
            return (
                <SeriesVideoPanel
                    key={index}
                    video={v}
                    seriesUUID={this.props.seriesUUID}
                    is_creator={this.props.is_creator}
                    is_private={v.is_private}
                    makeVideoPrivate={this.props.makeVideoPrivate}
                    makeVideoPublic={this.props.makeVideoPublic}
                    loadPageData={this.props.loadPageData}/>
            );
        });
        return (
            <div className="seriesVideoList">
                {videoPanels}
            </div>
        );
    }
}
