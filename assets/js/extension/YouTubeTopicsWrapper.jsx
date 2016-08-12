import React, { Component, PropTypes } from 'react';

import RegisterModal from 'js/globals/RegisterModal';
import YoutubeTopicList from 'js/extension/YoutubeTopicList';
import Player from 'js/globals/VideoPlayer/YoutubeEmbedPlayer';

function updateCurrentTopicOnKey(targetKey, topicList) {
    for (let i = 0; i < topicList.length; i++) {
        if (topicList[i].id === targetKey) {
            topicList[i].isCurrentTopic = true;
        } else {
            topicList[i].isCurrentTopic = false;
        }
    }
    return topicList;
}

export default class YouTubeTopicsWrapper extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        topicListOpen: false,
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

    clickOpenCloseBtn = () => {
        const isOpen = this.state.topicListOpen;
        this.setState({
            topicListOpen: !isOpen,
        })
        if (isOpen) {
            $("#topicWrapper").removeClass("active");
            $(body).removeClass("topiclist-active");
        } else {
            $("#topicWrapper").addClass("active");
            $(body).addClass("topiclist-active");
        }
    }


    render = () => {
        const openCloseText = this.state.topicListOpen ? "Close Topics" : "Open Topics"
        return (
            <div className="youtubeTopicsWrapper">
                <div className="openCloseBtn" onClick={this.clickOpenCloseBtn}>{openCloseText}</div>
                <YoutubeTopicList
                    topicObjList={this.props.data.topicList}
                />
            </div>
        );
    }
}
