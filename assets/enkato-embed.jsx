import 'css/main.scss';

import 'bootstrap-loader';
import 'react-fontawesome';

import React from 'react';
import { render } from 'react-dom';

import YouTubeQuestionWrapper from 'js/extension/YouTubeQuestionWrapper';
import YouTubeVideoWrapper from 'js/extension/YouTubeQuestionWrapper';

/**
 * obtains video id from YouTube url, provided that there is one
 * @return {Number|Boolean} Video id or false if it could not be parsed
 */
function getYTID(url) {
    const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regex);
    return (match && match[7].length === 11) ? match[7] : false;
}

function putVideoOnPage(videoUUID, seriesUUID) {
    // $('#movie_player').hide();
    render((
        <VideoPlayer
            videoUUID={videoUUID}
            seriesUUID={seriesUUID}
            embed
        />
    ), document.getElementById('player'));
}

function findInDatabase(ytId, callback) {
    $.ajax({
        url: `http://127.0.0.1:8000/1/ytvalidatevideo/${ytId}`,
        dataType: 'json',
        cache: false,
        success: (data) => {
            if (data.status) {
                callback(data);
            }
        },
        error: (status, err) => {
            console.error(status, err.toString());
        },
    });
}

$(document).ready(() => {
    const ytId = getYTID(`${window.location.href}`);
    if (ytId) {
        findInDatabase(ytId, (data) => {
            const qaBox = document.createElement('div');
            qaBox.setAttribute('id', 'qaWrapper');
            $(qaBox).insertBefore('#watch-discussion');

            render((
                <YouTubeQuestionWrapper
                    videoUUID={data.videoUUID}
                    topicList={[]}
                />
            ), qaBox);

            const videoBox = document.createElement('div');

            /*
            render((
                <YouTubeVideoWrapper
                    seriesUUID={data.seriesUUID}
                    videoUUID={data.videoUUID}
                />
            ), videoBox);
            */
        });
    }
});