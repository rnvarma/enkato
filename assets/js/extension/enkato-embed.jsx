import 'css/main.scss';

import React from 'react';
import { render } from 'react-dom';

import YouTubeQuestionWrapper from 'js/extension/YouTubeQuestionWrapper';

let url = window.location.href;

function isYTWatchPage() {
    return window.location.pathname === '/watch';
}

function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function getTYID() {
    let yt_id = getUrlParameter('v');
    return yt_id;
}

function checkURLChangeAndUpdate() {
    const newURL = window.location.href;
    if (newURL !== url) {
        if (isYTWatchPage()) {
            const ytId = getTYID();
            loadExtensionToPage(ytId);
        }
    }
    url = newURL;
}

function weAreOnPage() {

}

/**
 * obtains video id from YouTube url, provided that there is one
 * @return {Number|Boolean} Video id or false if it could not be parsed
 */
function getYTID(url) {
    const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regex);
    return (match && match[7].length === 11) ? match[7] : false;
}

function findInDatabase(ytId, callback) {
    $.ajax({
        url: `https://www.enkato.com/1/ytvalidatevideo/${ytId}`,
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

function getVideoData(videoUUID, callback) {
    $.ajax({
        url: `https://www.enkato.com/1/v/${videoUUID}`,
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

function loadExtensionToPage(ytId) {
    findInDatabase(ytId, ({ videoUUID }) => {
        getVideoData(videoUUID, (data) => {
            const qaBox = document.createElement('div');
            qaBox.setAttribute('id', 'qaWrapper');
            qaBox.setAttribute('class', 'questionArea');
            $(qaBox).insertBefore('#watch-discussion');

            render((
                <YouTubeQuestionWrapper
                    videoUUID={videoUUID}
                    topicList={data.topicList}
                />
            ), qaBox);
        });
    });
}

$(document).ready(() => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css';
    (document.head || document.documentElement).appendChild(style);

    if (isYTWatchPage()) {
        const ytId = getTYID();
        loadExtensionToPage(ytId);
    }

    (window).addEventListener('spfdone', function (event) {
        if (isYTWatchPage()) {
            const ytId = getTYID();
            loadExtensionToPage(ytId);
        }
    }, true);
});
