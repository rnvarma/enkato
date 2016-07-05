require('bootstrap-loader');
require('css/singlevideo/SingleVideoPage/SingleVideoPage')

import React from 'react';
import ReactDOM from 'react-dom';

import { Row, Col } from 'react-bootstrap';

import NavBar from 'js/globals/NavBar';
import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';

export default class SingleVideoPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <NavBar/>
            <Row className="videoPlayerWrapper">
              <Col mdOffset={1} md={10}>
                <VideoPlayer videoUUID={this.props.videoUUID}/>
              </Col>
            </Row>
          </div>
        );
    }
}

ReactDOM.render(<SingleVideoPage videoUUID={$("#v_uuid").attr("data-vuuid")} />, 
                document.getElementById('page-anchor'));


