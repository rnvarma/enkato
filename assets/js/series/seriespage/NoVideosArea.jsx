import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';

export default class NoVideosArea extends Component {
    render() {
        var hasVideos = (this.props.videos.length > 0)
        var title = hasVideos ? "Add more videos to this series." : "This series is currently empty."
        var addVideo;
        if (this.props.isCreator) {
            addVideo = (
               <div className="addVideo">
                    <Button onClick={this.props.openModal.bind(null, false)}
                        className="btn-primary">Import Video(s)</Button>
                </div> 
            )
        }
        return (
            <div className="noVideosArea baseContainer">
                <div className="defaultMessage">
                    <div className="title">
                        {title}
                    </div>
                {addVideo}
                </div>
            </div>
        )
    }
}