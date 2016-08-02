require('bootstrap-loader');
require("css/globals/base.scss")
require("css/series/seriespage/SeriesPage.scss");

import React, { Component } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Col';

import SeriesSideBar from 'js/series/seriespage/SeriesSideBar';
import SeriesMainArea from 'js/series/seriespage/SeriesMainArea';
import UploadAnnotateModal from 'js/series/seriespage/UploadAnnotateModal';
import auth from 'auth';
import request from 'js/globals/HttpRequest';


function changeVideoListPrivacy(videos, videoUUID, is_private) {
    for (var i = videos.length - 1; i >= 0; i--) {
        if(videos[i].uuid == videoUUID){
            videos[i].is_private = is_private;
        }
    }
    return videos;
}

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
            is_private: true,
            hide_series: false,
            thumbnails: [],
        };

        this.loadPageData = this.loadPageData.bind(this);
        this.onSubscribe = this.onSubscribe.bind(this);
        this.onUnsubscribe = this.onUnsubscribe.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onURLImport = this.onURLImport.bind(this);
        this.setUploadMode = this.setUploadMode.bind(this);
        this.setAnnotateMode = this.setAnnotateMode.bind(this);
        this.setTopicMode = this.setTopicMode.bind(this);
        this.setQuizMode = this.setQuizMode.bind(this);
        this.setUrls = this.setUrls.bind(this);
        this.makeVideoPrivate = this.makeVideoPrivate.bind(this);
        this.makeVideoPublic = this.makeVideoPublic.bind(this);
        this.setIsPrivate = this.setIsPrivate.bind(this);

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

    subscribeOrUnsubscribe(is_subscribed, prefix) {
        request.post(`/s/${this.state.seriesUUID}/${prefix}subscribe`, {
            success: (data) => {
                if (data.status) {
                    this.setState({is_subscribed: is_subscribed})
                } else {
                    console.log("sad face");
                }
            },
        });
    }

    setIsPrivate(is_private) {
        let data = {
            is_private: is_private,
            seriesUUID: this.state.seriesUUID,
        }

        request.post('/setseriesprivacy', {
            data: data,
            success: (data) => {
                if (data.status) {
                    this.setState({is_private: data.is_private})
                } else {
                    console.log("sad face");
                }
            },
        });
    }

    onSubscribe() {
        if (auth.loggedIn()) {
            this.subscribeOrUnsubscribe(true,'')
        } else {
            this.props.openRegisterModal(() => {
                this.subscribeOrUnsubscribe(true,'')
            });
        }
    }

    onUnsubscribe() {
        if (auth.loggedIn()) {
            this.subscribeOrUnsubscribe(false,'un')
        } else {
            this.props.openRegisterModal(() => {
                this.subscribeOrUnsubscribe(false,'un')
            });
        }
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

    makeVideoPublic(videoUUID) {
        var data = {
            videoUUID: videoUUID,
            is_private:false,
        }

        request.post('/changePrivacy', {
            data:data,
            success: (data) => {
                if (data.status) {
                    var tempVideos = this.state.videos;
                    this.setState({
                        videos: changeVideoListPrivacy(tempVideos, videoUUID, false)
                    })
                } else {
                    console.log("sad face");
                }
            },
        })
    }

    makeVideoPrivate(videoUUID) {
        var data = {
            videoUUID: videoUUID,
            is_private:true,
        }

        request.post('/changePrivacy', {
            data:data,
            success: (data) => {
                if (data.status) {
                    var tempVideos = this.state.videos;
                    this.setState({
                        videos: changeVideoListPrivacy(tempVideos, videoUUID, true)
                    })
                } else {
                    console.log("sad face");
                }
            },
        })
    }

    render() {
        if(this.state.hide_series) {
            return (
                <div className="seriesPage">
                    <Col md={12}>
                        <div className="unavailable">
                            This Page is Unavailable!
                        </div>
                    </Col>
                </div>
            );
        }

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
                            makeVideoPublic={this.makeVideoPublic}
                            makeVideoPrivate={this.makeVideoPrivate}
                            setIsPrivate={this.setIsPrivate}
                            loadPageData={this.loadPageData}
                            {...this.state}/>
                    </Col>
                </Row>
                {uploadModal}
            </div>
        );
    }
}

module.exports = SeriesPage;