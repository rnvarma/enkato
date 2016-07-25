
require("css/series/seriespage/AnnotateSeriesSideBar.scss");

import React, { Component } from 'react';

import AnnotateSeriesSideBarButton from 'js/series/seriespage/AnnotateSeriesSideBarButton';
import ScrollArea from 'react-scrollbar';

export default class AnnotateSeriesSideBar extends Component {
    render() {
        var updateCurrVideo = this.props.updateCurrVideo;
        var currVideoID = this.props.currentVideo.uuid;
        var sideButtons = this.props.videos.map(function(v) {
            var isCurrVideo = (currVideoID == v.uuid)
            return (
                <AnnotateSeriesSideBarButton
                    video={v}
                    key={v.order}
                    updateCurrVideo={updateCurrVideo}
                    isCurrVideo={isCurrVideo}/>
            );
        });
        
        return (
            <ScrollArea className="annotateSeriesSideBar">
                {sideButtons}
            </ScrollArea>
        );
    }
};
