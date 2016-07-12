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
            currUUID: ""
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.loadDateFromServer = this.loadDateFromServer.bind(this)
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
                    }
                }
                this.setState(stateData);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({currUUID: nextProps.currUUID})
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