require('bootstrap-loader');
require('css/singlevideo/singlevideoview/SingleVideoPage.scss');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import request from 'js/globals/HttpRequest';
import NavBar from 'js/globals/NavBar';
import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';
import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

class SingleVideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: [],
      getCurrentTime: null
    };

    this.setTopicList = this.setTopicList.bind(this);
    this.setGetCurrentTime = this.setGetCurrentTime.bind(this);
  }

  setTopicList(topicList) {
    this.setState({ topicList });
  }

  setGetCurrentTime(getCurrentTime) {
    this.setState({ getCurrentTime });
  }

  render() {
    return (
      <div className="singleVideoPage">
        <NavBar />
        <Row className="videoPlayerWrapper">
          <Col mdOffset={1} md={10}>
            <VideoPlayer
              videoUUID={this.props.videoUUID}
              setTopicList={this.setTopicList}
              setGetCurrentTime={this.setGetCurrentTime}
            />
          </Col>
        </Row>
        <Row className="questionWrapper">
          <Col mdOffset={1} md={10}>
            <QuestionView
              videoUUID={this.props.videoUUID}
              topicList={this.state.topicList}
              getCurrentTime={this.state.getCurrentTime}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

module.exports = SingleVideoPage


