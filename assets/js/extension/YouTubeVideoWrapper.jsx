import React, { Component, PropTypes } from 'react';

import RegisterModal from 'js/globals/RegisterModal';
import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';

export default class YouTubeQuestionWrapper extends Component {
    static propTypes = {
        seriesUUID: PropTypes.string.isRequired,
        videoUUID: PropTypes.string.isRequired,
    }

    state = {
        registerOpen: false,
        registerCallback: function empty() { },
    }

    openRegister = (callback) => {
        this.setState({
            registerOpen: true,
            registerCallback: callback,
        });
    }

    closeRegister = () => {
        this.setState({
            registerOpen: false,
        });
    }

    render() {
        return (
            <div className="youtubeWrapper">
                <RegisterModal
                    registerModalOpen={this.state.registerOpen}
                    closeRegisterModal={this.closeRegister}
                    callbackFn={this.state.registerCallback}
                />
                <VideoPlayer
                    seriesUUID={this.props.seriesUUID}
                    videoUUID={this.props.videoUUID}
                    openRegisterModal={this.openRegister}
                />
            </div>
        );
    }
}
