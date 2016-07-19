require('css/series/seriesviewer/SeriesViewerSideBar.scss');

import React from 'react';

import SeriesViewerHeader from 'js/series/seriesviewer/SeriesViewerHeader';
import SeriesViewerVideoList from 'js/series/seriesviewer/SeriesViewerVideoList';
import SeriesViewerNextButton from 'js/series/seriesviewer/SeriesViewerNextButton';

class SeriesViewerSideBar extends React.Component {

    render() {
        return (
            <div className="seriesViewerSideBar">
                <SeriesViewerHeader 
                    seriesName={this.props.name}
                    seriesCreator={this.props.creator}
                    currVideo={this.props.currVideo}/>
                <SeriesViewerVideoList
                    videos={this.props.videos}
                    currUUID={this.props.currUUID}/>
                <SeriesViewerNextButton
                    nextVideo={this.props.nextVideo}/>
            </div>
        );
    }
}

export default SeriesViewerSideBar;
