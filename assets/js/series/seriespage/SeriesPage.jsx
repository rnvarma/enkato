require('bootstrap-loader');
require("css/globals/base.scss")
require("css/series/seriespage/SeriesPage.scss");

import React, { Component } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Col';

import SeriesSideBar from 'js/series/seriespage/SeriesSideBar';
import SeriesMainArea from 'js/series/seriespage/SeriesMainArea';
import UploadAnnotateModal from 'js/series/seriespage/UploadAnnotateModal';
import request from 'js/globals/HttpRequest';

class SeriesPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seriesUUID: this.props.params.seriesUUID,
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

        this.loadPageData = this.loadPageData.bind(this)
        this.onSubscribe = this.onSubscribe.bind(this)
        this.onUnsubscribe = this.onUnsubscribe.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onURLImport = this.onURLImport.bind(this)
        this.setUploadMode = this.setUploadMode.bind(this)
        this.setAnnotateMode = this.setAnnotateMode.bind(this)
        this.setTopicMode = this.setTopicMode.bind(this)
        this.setQuizMode = this.setQuizMode.bind(this)
        this.setUrls = this.setUrls.bind(this)
    }

    componentDidMount() {
        this.loadPageData();
    }

    loadPageData(seriesUUID) {
        request.get(`/1/s/${seriesUUID || this.state.seriesUUID}`, {
            cache: true,
            success: (data) => {
                var stateData = this.state;
                /* update state.data */
                $.extend(true, stateData, data);
                this.setState(stateData);
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.seriesUUID != this.state.seriesUUID) {
            this.loadPageData(nextProps.params.seriesUUID);
            this.setState({
                seriesUUID: nextProps.params.seriesUUID
            })
        }
    }

    onSubscribe() {
        request.post(`/s/${this.state.seriesUUID}/subscribe`, {
            success: (data) => {
                if (data.status) {
                    this.setState({is_subscribed: true})
                } else {
                    console.log("sad face");
                }
            },
        })
    }

    onUnsubscribe() {
        request.post(`/s/${this.state.seriesUUID}/subscribe`, {
            success: (data) => {
                if (data.status) {
                    this.setState({is_subscribed: false})
                } else {
                    console.log("sad face");
                }
            },
        })
    }

    openModal(annotating) {
        this.setState({
            show: true,
            annotateMode: annotating
        });
    }

    closeModal() {
        this.setState({
            show: false,
            annotateMode: false,
            quizMode: false
        });
        this.loadPageData();
    }

    onURLImport(event) {
        this.setState({
            urls: event.target.value
        });
    }

    setUploadMode() {
        this.setState({
            annotateMode: false
        });
    }

    setAnnotateMode() {
        this.setState({
            annotateMode: true
        });
    }

    setTopicMode() {
        this.setState({
            quizMode: false
        });
    }

    setQuizMode() {
        this.setState({
            quizMode: true
        });
    }

    setUrls(newUrls) {
        this.setState({
            urls: newUrls
        });
    }

    render() {
        if (this.state.is_creator) {
            var uploadModal = (
                <UploadAnnotateModal
                    {...this.state}
                    close={this.closeModal}
                    setTopicMode={this.setTopicMode}
                    setQuizMode={this.setQuizMode}
                    setAnnotateMode={this.setAnnotateMode}
                    setUploadMode={this.setUploadMode}
                    setUrls={this.setUrls}
                    onURLImport={this.onURLImport}
                    reloadPageData={this.loadPageData}/>
            )
        } else {
            var uploadModal = ""
        }
        return (
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
        );
    }
}

console.log("ran the series page")

module.exports = SeriesPage;