import "css/main.scss";

import React from 'react';
import { render } from 'react-dom';

// import RegisterModal from 'js/globals/RegisterModal';
import VideoPlayer from 'js/globals/VideoPlayer/VideoPlayer';
// import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

function getYTID(url) {
    const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regex);
    return (match && match[7].length === 11) ? match[7] : false;
}

function resizePlayer() {
    const contentWidth = $('#content').width();
    const playerWidth = $('#player-api').width();
    const leftMargin = Number($('#content').css('margin-left').replace('px', ''));
    const playerLeft = (contentWidth - playerWidth) + leftMargin;
    $('#player-api').css('left', playerLeft);
}

function putVideoOnPage(videoUUID, seriesUUID) {
    // $('#page').addClass('watch-wide watch-stage-mode');
    // resizePlayer();
    // window.onresize = resizePlayer;
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
    findInDatabase(ytId, (data) => {
        putVideoOnPage(data.videoUUID, data.seriesUUID);
    });
});
