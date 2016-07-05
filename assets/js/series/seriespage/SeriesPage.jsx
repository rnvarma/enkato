require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require("css/series/seriespage/SeriesPage.scss");

import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from 'js/globals/NavBar';
import { Col, Row } from 'react-bootstrap';

import SeriesSideBar from 'js/series/seriespage/SeriesSideBar';
import SeriesMainArea from 'js/series/seriespage/SeriesMainArea';
import UploadAnnotateModal from 'js/series/seriespage/UploadAnnotateModal';

var SeriesPage = React.createClass({
    getInitialState: function() {
        return {
            data: {
                s_id: $("#s_id").attr("data-sid"),
                name: '',
                description: '',
                image: '',
                videos: [],
                creator: {},
                num_videos: 0,
                total_len: 0,
            },
            urls: "",
            show: false,
            annotateMode: false,
            quizMode: false
        }
    },
    openModal: function(annotating) {
        this.setState({ show: true, annotateMode: annotating });
    },
    closeModal: function() {
        this.setState({ show: false });
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
    loadPageData: function() {
        $.ajax({
          url: "/1/s/" + this.state.data.s_id,
          dataType: 'json',
          cache: false,
            success: function(data) {
                var stateData = this.state.data;
                /* update state.data */
                $.extend(true, stateData, data);
                this.setState({ data: stateData });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadPageData();
    },
    render: function() {
        return (
            <div>
                <NavBar />
                <div className="seriesPage">
                    <Row>
                        <Col md={2}>
                            <SeriesSideBar />
                        </Col>
                        <Col md={10}>
                            <SeriesMainArea
                                openModal={this.openModal}
                                data={this.state.data}
                            />
                        </Col>
                    </Row>
                    <UploadAnnotateModal
                        {...this.state}
                        close={this.closeModal}
                        setTopicMode={this.setTopicMode} setQuizMode={this.setQuizMode}
                        setAnnotateMode={this.setAnnotateMode} setUrls={this.setUrls}
                        onURLImport={this.onURLImport}
                        reloadPageData={this.loadPageData}
                    />
                </div>
            </div>
        );
    }
})

ReactDOM.render(<SeriesPage />, document.getElementById('page-anchor'))
