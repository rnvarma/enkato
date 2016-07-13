require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require("css/series/seriesviewer/SeriesViewer.scss");

import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from 'js/globals/NavBar';
import { Col, Row } from 'react-bootstrap';
import getCookie from 'js/globals/GetCookie';

import SeriesViewerSideBar from 'js/series/seriesviewer/SeriesViewerSideBar';
import SeriesViewerVideoArea from 'js/series/seriesviewer/SeriesViewerVideoArea';

class SeriesViewer extends React.Component {
    constructor() {
        super()
        this.state = {
            s_id: $("#s_id").attr("data-sid"),
            name: '',
            description: '',
            image: '',
            videos: [],
            creator: {},
            num_videos: 0,
            total_len: 0,
            urls: "",
            show: false,
            annotateMode: false,
            quizMode: false,
            is_creator: false,
            is_subscribed: false,
            currVideo: null,
            currUUID: "",
            nextVideo: null,
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.loadDateFromServer = this.loadDateFromServer.bind(this)
        this.calculateVidScrollTop = this.calculateVidScrollTop.bind(this)
        this.scrollToVideo = this.scrollToVideo.bind(this)
    }

    loadDateFromServer(currUUID) {
        $.ajax({
          url: "/1/s/" + this.state.s_id,
          dataType: 'json',
          cache: false,
            success: function(data) {
                var stateData = this.state;
                /* update state.data */
                $.extend(true, stateData, data);
                for (var i = 0; i < data.videos.length; i++) {
                    if (data.videos[i].uuid == currUUID) {
                        stateData.currVideo = data.videos[i];
                        if (i < data.videos.length - 1)
                            stateData.nextVideo = data.videos[i + 1]
                    }
                }
                this.setState(stateData);
                this.scrollToVideo(currUUID)
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    }

    calculateVidScrollTop(uuid) {
        var top = 0;
        for (var i = 0; i < this.state.videos.length; i++) {
            if (this.state.videos[i].uuid != uuid){
                top += $("#panel-" + this.state.videos[i].uuid).outerHeight();
            } else {
                break;
            }
        }
        return top
    }

    scrollToVideo(uuid) {
        var top = this.calculateVidScrollTop(uuid);
        $('.seriesViewerVideoList').animate({ scrollTop: top}, 500);
    }

    componentWillReceiveProps(nextProps) {
        var newUUID = nextProps.currUUID;
        var newVideo, nextVideo;
        for (var i = 0; i < this.state.videos.length; i++) {
            if (this.state.videos[i].uuid == newUUID) {
                newVideo = this.state.videos[i];
                if (i < this.state.videos.length - 1)
                    nextVideo = this.state.videos[i + 1]
            }
        }
        this.scrollToVideo(newUUID)
        this.setState({
            currUUID: newUUID,
            currVideo: newVideo,
            nextVideo: nextVideo
        })
    }

    componentDidMount() {
        this.setState({currUUID: this.props.currUUID})
        this.loadDateFromServer(this.props.currUUID)
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="seriesViewer">
                    <SeriesViewerSideBar
                        {...this.state}/>
                    <SeriesViewerVideoArea
                        currUUID={this.state.currUUID}/>+
                </div>
            </div>
        )
    }
}

$(window).on("hashchange", function () {
    ReactDOM.render(<SeriesViewer currUUID={window.location.hash.slice(1, 100)}/>, document.getElementById('page-anchor'))
})

ReactDOM.render(<SeriesViewer currUUID={window.location.hash.slice(1, 100)}/>, document.getElementById('page-anchor'))