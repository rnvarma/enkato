require('bootstrap-loader');
require("css/globals/base.scss")
require("css/series/seriesviewer/SeriesViewer.scss");

import React, { Component } from 'react';

import request from 'js/globals/HttpRequest';
import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';
import SeriesViewerSideBar from 'js/series/seriesviewer/SeriesViewerSideBar';
import SeriesViewerVideoArea from 'js/series/seriesviewer/SeriesViewerVideoArea';

class SeriesViewer extends Component {
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
        currVideo: null,
        currUUID: "",
        nextVideo: null,
        topicList: [],
        getCurrentTime: null,
      }

      this.loadDataFromServer = this.loadDataFromServer.bind(this);
      this.calculateVidScrollTop = this.calculateVidScrollTop.bind(this);
      this.scrollToVideo = this.scrollToVideo.bind(this);
      this.setTopicList = this.setTopicList.bind(this);
      this.setGetCurrentTime = this.setGetCurrentTime.bind(this);
      this.changeCurrVideo = this.changeCurrVideo.bind(this)
    }

    componentDidMount() {
        var currUUID = window.location.hash.slice(1, 100);
        this.setState({currUUID: this.props.currUUID})
        this.loadDataFromServer(currUUID)

        $(window).on('hashchange', () => {
            var newUUID = window.location.hash.slice(1, 100);
            this.changeCurrVideo(newUUID)
        })
    }

    loadDataFromServer(currUUID) {
      request.get(`/1/s/${this.state.seriesUUID}`, {
        success: (data) => {
          var stateData = this.state;
          /* update state.data */
          $.extend(true, stateData, data);
          for (var i = 0; i < data.videos.length; i++) {
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
      })
    }

    changeCurrVideo(newUUID) {
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

    setTopicList(topicList) {
      this.setState({ topicList });
    }

    setGetCurrentTime(getCurrentTime) {
      this.setState({ getCurrentTime });
    }

    render() {
      return (
        <div>
          <SeriesViewerSideBar
            {...this.state}/>
          <div className="seriesViewer">
            <SeriesViewerVideoArea
              setTopicList={this.setTopicList}
              setGetCurrentTime={this.setGetCurrentTime}
              currUUID={this.state.currUUID}
              seriesUUID={this.state.seriesUUID}
              nextVideo={this.state.nextVideo}/>
            <div className="questionArea">
              <QuestionView
                videoUUID={this.state.currUUID}
                topicList={this.state.topicList}
                getCurrentTime={this.state.getCurrentTime}/>
            </div>
          </div>
        </div>
      );
    }
}

module.exports = SeriesViewer