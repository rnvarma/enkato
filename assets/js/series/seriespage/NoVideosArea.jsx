
require("css/series/seriespage/NoVideosArea.scss");

import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';

export default class NoVideosArea extends Component {
    render() {
        var hasVideos = (this.props.videos.length > 0)
        var title = hasVideos ? "Add more videos to this series." : "This series is currently empty."
        var overAllClass = hasVideos ? "noVideosArea hasVideos" : "noVideosArea"

        return (
            <div className={overAllClass}>
                <div>{title}</div>
                <div className="addVideo">
                    <Button onClick={this.props.openModal.bind(null, false)}
                        className="addVideoBtn">Import Video(s)</Button>
                </div>
            </div>
        )
    }
}