import React, { Component } from 'react';

import request from 'js/globals/HttpRequest';
import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';
import SeriesViewerSideBar from 'js/series/seriesviewer/SeriesViewerSideBar';
import SeriesViewerVideoArea from 'js/series/seriesviewer/SeriesViewerVideoArea';

class SeriesViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seriesUUID: this.props.params.seriesUUID,
            name: '',
            description: '',
            image: '',
            videos: [],
            creator: {},
            num_videos: 0,
            total_len: 0,
            urls: '',
            show: false,
            annotateMode: false,
            quizMode: false,
            is_creator: false,
            is_subscribed: false,
            currVideo: null,
            currUUID: '',
            nextVideo: null,
            topicList: [],
            getCurrentTime: null,
            is_private: true,
            hide_series: false,
        };

        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.calculateVidScrollTop = this.calculateVidScrollTop.bind(this);
        this.scrollToVideo = this.scrollToVideo.bind(this);
        this.setTopicList = this.setTopicList.bind(this);
        this.setGetCurrentTime = this.setGetCurrentTime.bind(this);
        this.changeCurrVideo = this.changeCurrVideo.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
        this.loadQuiz = this.loadQuiz.bind(this);
    }

    componentDidMount() {
        const currUUID = window.location.hash.slice(1, 23);
        this.setState({ currUUID: this.props.currUUID });
        this.loadDataFromServer(currUUID);
        console.log(this);

        $(window).on('hashchange', () => {
            const newUUID = window.location.hash.slice(1, 23);
            this.changeCurrVideo(newUUID);
        });
    }

    loadDataFromServer(currUUID) {
        request.get(`/1/s/${this.state.seriesUUID}`, {
            success: (data) => {
                const stateData = this.state;

                if (data.hide_series) {
                  this.setState({
                    hide_series: true,
                });
                  return;
              }

          /* update state.data */
                $.extend(true, stateData, data);
                for (let i = 0; i < data.videos.length; i++) {
                  if (!currUUID || data.videos[i].uuid === currUUID) {
                    stateData.currVideo = data.videos[i];
                    stateData.currUUID = stateData.currVideo.uuid;
                    if (i < data.videos.length - 1) {
                      stateData.nextVideo = data.videos[i + 1];
                  }
                    break;
                }
              }
                this.setState(stateData);
                this.scrollToVideo(stateData.currUUID);
            },
        });
    }

    changeCurrVideo(newUUID) {
        let newVideo, nextVideo;
        for (let i = 0; i < this.state.videos.length; i++) {
            if (this.state.videos[i].uuid == newUUID) {
                newVideo = this.state.videos[i];
                if (i < this.state.videos.length - 1)
                    nextVideo = this.state.videos[i + 1];
            }
        }
        this.scrollToVideo(newUUID);
        this.setState({
            currUUID: newUUID,
            currVideo: newVideo,
            nextVideo,
        });
    }

    calculateVidScrollTop(uuid) {
        let top = 0;
        for (let i = 0; i < this.state.videos.length; i++) {
            if (this.state.videos[i].uuid != uuid) {
                top += $('#panel-' + this.state.videos[i].uuid).outerHeight();
            } else {
                break;
            }
        }
        return top;
    }

    scrollToVideo(uuid) {
        const top = this.calculateVidScrollTop(uuid);
        $('.seriesViewerVideoList').animate({ scrollTop: top }, 500);
    }

    setTopicList(topicList) {
        this.setState({ topicList });
    }

    setGetCurrentTime(getCurrentTime) {
        this.setState({ getCurrentTime });
    }

    setStartTime() {
        const params = [];
        const hashes = window.location.hash.slice(24).split('&');
        for (let i = 0; i < hashes.length; i++) {
            const param = hashes[i].split('=');
            params.push(param[0]);
            params[param[0]] = param[1];
        }
        const startTime = params['t'];
        return startTime;
    }

    loadQuiz() {
        const params = [];
        const hashes = window.location.hash.slice(24).split('&');
        for (let i = 0; i < hashes.length; i++) {
            const param = hashes[i].split('=');
            params.push(param[0]);
            params[param[0]] = param[1];
        }
        const showQuiz = params['quiz'];
        return showQuiz;
    }

    render() {
        if (this.state.hide_series) {
            return (
                <div className="unavailable">
                    This Page is Unavailable!
                </div>
            );
        }

        return (
        <div>
          <SeriesViewerSideBar
              {...this.state}
          />
          <div className="seriesViewer">
            <SeriesViewerVideoArea
                openRegisterModal={this.props.openRegisterModal}
                setTopicList={this.setTopicList}
                loadQuiz={this.loadQuiz}
                setStartTime={this.setStartTime}
                setGetCurrentTime={this.setGetCurrentTime}
                currUUID={this.state.currUUID}
                seriesUUID={this.state.seriesUUID}
                nextVideo={this.state.nextVideo}
            />
            <div className="questionArea">
              <QuestionView
                  openRegisterModal={this.props.openRegisterModal}
                  videoUUID={this.state.currUUID}
                  topicList={this.state.topicList}
                  getCurrentTime={this.state.getCurrentTime}
              />
            </div>
          </div>
        </div>
      );
    }
}

module.exports = SeriesViewer
;
