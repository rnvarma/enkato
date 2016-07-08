require('bootstrap-loader');
require('css/singlevideo/singlevideoview/SingleVideoPage.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import NavBar from 'js/globals/NavBar';
import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';
import QuestionView from 'js/singlevideo/singlevideoview/QuestionView';

class SingleVideoPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Row className="videoPlayerWrapper">
          <Col mdOffset={1} md={10}>
            <VideoPlayer videoUUID={this.props.videoUUID} />
          </Col>
        </Row>
        <Row className="questionWrapper">
          <Col mdOffset={1} md={10}>
            <QuestionView videoUUID={this.props.videoUUID} />
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(<SingleVideoPage videoUUID={$("#v_uuid").attr("data-vuuid")} />,
                document.getElementById('page-anchor'));


