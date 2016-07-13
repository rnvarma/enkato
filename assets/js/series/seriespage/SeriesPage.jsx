require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require("css/series/seriespage/SeriesPage.scss");

import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from 'js/globals/NavBar';
import { Col, Row } from 'react-bootstrap';
import getCookie from 'js/globals/GetCookie';

import SeriesSideBar from 'js/series/seriespage/SeriesSideBar';
import SeriesMainArea from 'js/series/seriespage/SeriesMainArea';
import UploadAnnotateModal from 'js/series/seriespage/UploadAnnotateModal';

var SeriesPage = React.createClass({
    getInitialState: function() {
        return {
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
        }
    },
    openModal: function(annotating) {
        this.setState({ show: true, annotateMode: annotating });
    },
    closeModal: function() {
        this.setState({
            show: false,
            annotateMode: false,
            quizMode: false
        });
    },
    onURLImport: function(event) {
        this.setState({ urls: event.target.value });
    },
    setAnnotateMode: function(bool) {
        this.setState({ annotateMode: bool });
    },
    setTopicMode: function() {
        this.setState({ quizMode: false });
    },
    setQuizMode: function() {
        this.setState({ quizMode: true });
    },
    setUrls: function(newUrls) {
        this.setState({ urls: newUrls });
    },
    loadPageData: function(callback = function() {}) {
        $.ajax({
          url: "/1/s/" + this.state.s_id,
          dataType: 'json',
          cache: false,
            success: function(data) {
                var stateData = this.state;
                /* update state.data */
                $.extend(true, stateData, data);
                this.setState(stateData, callback());
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadPageData();
    },
    onSubscribe: function() {
        $.ajax({
          url: "/s/" + this.state.s_id + "/subscribe",
          dataType: 'json',
          type: 'POST',
          data: {},
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                this.setState({is_subscribed: true})
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    onUnsubscribe: function() {
        $.ajax({
          url: "/s/" + this.state.s_id + "/unsubscribe",
          dataType: 'json',
          type: 'POST',
          data: {},
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            if (data.status) {
                this.setState({is_subscribed: false})
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        if (this.state.is_creator) {
            var uploadModal = (
                <UploadAnnotateModal
                    {...this.state}
                    close={this.closeModal}
                    setTopicMode={this.setTopicMode}
                    setQuizMode={this.setQuizMode}
                    setAnnotateMode={this.setAnnotateMode}
                    setUrls={this.setUrls}
                    onURLImport={this.onURLImport}
                    reloadPageData={this.loadPageData}/>
            )
        } else {
            var uploadModal = ""
        }
        return (
            <div>
                <NavBar />
                <div className="seriesPage">
                    <Row>
                        <Col style={{display:"none"}}>
                            <SeriesSideBar />
                        </Col>
                        <Col md={12}>
                            <SeriesMainArea
                                openModal={this.openModal}
                                onSubscribe={this.onSubscribe}
                                onUnsubscribe={this.onUnsubscribe}
                                {...this.state}/>
                        </Col>
                    </Row>
                    {uploadModal}
                </div>
            </div>
        );
    }
})

ReactDOM.render(<SeriesPage />, document.getElementById('page-anchor'))
