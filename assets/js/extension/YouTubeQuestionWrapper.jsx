import React, { Component, PropTypes } from 'react';

import RegisterModal from 'js/globals/RegisterModal';
import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

export default class YouTubeQuestionWrapper extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        topicList: PropTypes.array.isRequired,
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
                    embed
                />
                <QuestionView
                    videoUUID={this.props.videoUUID}
                    topicList={this.props.topicList}
                    openRegisterModal={this.openRegister}
                    embed
                />
            </div>
        );
    }
}
