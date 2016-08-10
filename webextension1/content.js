window.onpopstate = function () {
    console.log('popstate event triggered');
    location.reload();
};

function removeMessage() {
    const parentDiv = document.getElementById('enkato-parent-div');
    const bodyContainer = document.getElementById('body-container');
    bodyContainer.removeChild(parentDiv);
    const page = document.getElementById('page-container');
    page.style.margin = '0px';
}


function styleMainMessage(enkatoDiv, vidUUID, seriesUUID) {
    const logo = document.createElement('img');
    const imgurl = chrome.extension.getURL('images/whitelogo.png');
    enkatoDiv.appendChild(logo);
    logo.className = 'logo';
    logo.setAttribute('src', imgurl);
    logo.style.height = '20px';
    logo.style.margin = '7.5px 8px 7.5px 30px';
    logo.style.cssFloat = 'left';

    const textDiv = document.createElement('div');
    textDiv.className = 'text-div';
    enkatoDiv.appendChild(textDiv);
    textDiv.style.overflow = 'hidden';
    textDiv.style.color = 'white';
    textDiv.style.fontFamily = "'Roboto', sans-serif";
    textDiv.style.fontSize = '14px';
    textDiv.style.color = 'white';
    textDiv.style.width = '590px';
    textDiv.style.cssFloat = 'left';

    const availableDiv = document.createElement('div');
    textDiv.appendChild(availableDiv);
    availableDiv.innerHTML = 'This video is available on Enkato!';
    availableDiv.style.margin = '7.5px 0 7.5px 15px';
    availableDiv.style.padding = '2px';
    availableDiv.style.fontWeight = '500';
    availableDiv.style.width = '210px';
    availableDiv.style.cssFloat = 'left';

    const watchDiv = document.createElement('div');
    textDiv.appendChild(watchDiv);
    watchDiv.innerHTML = 'Click here to view topics, ask a question, or take the quiz!';
    watchDiv.style.fontWeight = '700';
    watchDiv.style.cursor = 'pointer';
    watchDiv.style.margin = '7.5px 5px 7.5px 228px';
    watchDiv.style.padding = '2px';
    watchDiv.style.width = '380px';
    watchDiv.onclick = function () {
        window.open('http://127.0.0.1:8000/s/' + seriesUUID + '/watch#' + vidUUID);
    };

    const exit = document.createElement('div');
    enkatoDiv.appendChild(exit);
    exit.innerHTML = 'x';
    exit.style.color = 'white';
    exit.style.cssFloat = 'right';
    exit.style.cursor = 'default';
    exit.style.margin = '0px 5px 5px 5px';
    exit.onclick = function () {
        removeMessage();
    };
}

function showMainMessage(vidUUID, seriesUUID) {
    const enkatoDiv = document.createElement('div');
    const pageContainer = document.getElementById('page-container');
    document.getElementById('body-container').insertBefore(enkatoDiv, pageContainer);

    enkatoDiv.setAttribute('id', 'enkato-parent-div');
    enkatoDiv.style.backgroundColor = '#01113E';
    enkatoDiv.style.width = '100%';
    enkatoDiv.style.height = '35px';
    enkatoDiv.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 2px 2px 2px';
    enkatoDiv.style.position = 'fixed';
    enkatoDiv.style.zIndex = '10';
    enkatoDiv.style.overflow = 'hidden';
    styleMainMessage(enkatoDiv, vidUUID, seriesUUID);
    pageContainer.style.marginTop = '40px';
}

function showEnkatoDiv(vidUUID, seriesUUID) {
    const enkatoDiv = document.createElement('div');
    enkatoDiv.className = 'side-enkato-div';
    enkatoDiv.style.backgroundColor = '#01113E';
    enkatoDiv.style.height = '20px';

    const image = document.createElement('img');
    enkatoDiv.appendChild(image);
    const imgurl = chrome.extension.getURL('images/whitelogo.png');
    image.setAttribute('src', imgurl);
    image.setAttribute('height', '15px');
    image.style.padding = '2px';
    image.style.cursor = 'pointer';

    $(enkatoDiv).click(function (event) {
        window.open('http://127.0.0.1:8000/s/' + seriesUUID + '/watch#' + vidUUID);
        event.preventDefault();
    });
    return enkatoDiv;
}

function showSideMessage(vidNum, vidUUID, seriesUUID) {
    const div = showEnkatoDiv(vidUUID, seriesUUID);
    const parentDivs = document.getElementById('watch7-sidebar-modules').querySelectorAll('.content-wrapper');
    parentDivs[vidNum].firstElementChild.appendChild(div);
}

function showSearchMessage(vidNum, vidUUID, seriesUUID) {
    const div = showEnkatoDiv(vidUUID, seriesUUID);
    const allParents = document.getElementById('results').firstElementChild.lastElementChild.firstElementChild.children;
    allParents[vidNum].firstElementChild.firstElementChild.lastElementChild.appendChild(div);
}

function getSidebarInfo() {
    const allSideVideos = document.getElementById('watch7-sidebar-modules').querySelectorAll('.content-wrapper');
    const urls = [];
    for (let i = 0; i < allSideVideos.length; i++) {
        getUrlNode(allSideVideos[i], function (urlNode) {
            urls.push(urlNode.href);
        });
    }
    const ids = [];
    for (let i = 0; i < urls.length; i++) {
        ids.push(getYTID(urls[i]));
    }
    return (ids);
}

function getUrlNode(sideVideo, callback) {
    const urlNode = sideVideo.firstElementChild;
    callback(urlNode);
}

function getSearchVidInfo() {
    const allSearchVids = document.getElementById('results').firstElementChild.lastElementChild.firstElementChild.children;
    if (allSearchVids == null) {
        return false;
    }
    const ids = [];
    for (let i = 0; i < allSearchVids.length; i++) {
        const child = allSearchVids[i].firstElementChild;
        const id = child.getAttribute('data-context-item-id');
        ids.push(id);
    }
    console.log(ids);
    return (ids);
}

function getYTID(url) {
    const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regex);
    return (match && match[7].length == 11) ? match[7] : false;
}


function findInDatabase(vid_id, vid_num, callback) {
    $.ajax({
        url: 'http://127.0.0.1:8000/2/v/' + vid_id,
        dataType: 'json',
        cache: false,
        success(data) {
            const inDB = JSON.parse(data.inDatabase);
            let vidUUID;
            if (inDB) {
                const vidData = data.videoData;
                vidUUID = vidData.uuid;
            }
            callback(inDB, vid_num, vidUUID);
        },
        error(status, err) {
            console.error(status, err.toString());
        },
    });
}

function getSeriesUUID(vid_id, callback) {
    $.ajax({
        url: 'http://127.0.0.1:8000/2/s/' + vid_id,
        dataType: 'json',
        cache: false,
        success(data) {
            const seriesInfo = data.seriesVideoData;
            const seriesUUID = seriesInfo.seriesUUID;
            callback(seriesUUID);
        },
        error(status, err) {
            console.error(error.statusText, err.toString());
        },
    });
}

const windURL = '' + window.location.href;

$(document).ready(function () {
    const vid_id = getYTID(windURL);
    if (vid_id != false) {
        const mainNum = 0;
        findInDatabase(vid_id, mainNum, function (inDB, mainNum, mainUUID) {
            if (inDB) {
                getSeriesUUID(vid_id, function (seriesUUID) {
                    showMainMessage(mainUUID, seriesUUID);
                });
            }
        });
        console.log('beginning side videos');
        const sideVidIds = getSidebarInfo();
        for (let i = 0; i < sideVidIds.length; i++) {
            findInDatabase(sideVidIds[i], i, function (inDB, i, sideUUID) {
                if (inDB) {
                    getSeriesUUID(sideVidIds[i], function (seriesUUID) {
                        showSideMessage(i, sideUUID, seriesUUID);
                    });
                }
            });
        }
    }
    else if (vid_id == false) {
        const searchIds = getSearchVidInfo();
        if (searchIds != false) {
            for (let i = 0; i < searchIds.length; i++) {
                if (searchIds[i] != null) {
                    findInDatabase(searchIds[i], i, function (inDB, i, searchUUID) {
                        if (inDB) {
                            getSeriesUUID(searchIds[i], function (seriesUUID) {
                                showSearchMessage(i, searchUUID, seriesUUID);
                            });
                        }
                    });
                }
            }
        }
    }
    console.log('finished');
});


chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if ((message.from == 'popup') && (message.subject == 'url')) {
        console.log('got message from popup');

        const timestampNode = document.getElementById('movie_player').querySelector('.ytp-storyboard-lens-timestamp');
        const timestamp = timestampNode.textContent;

        const metaInfo = document.getElementsByTagName('meta');
        const title = metaInfo[0].content;

        const vidId = getYTID(windURL);
        let info = {};
        info = {
            videoId: vidId,
            timestampText: timestamp,
            videoTitle: title,
        };
        response(info);
    }
    else {
        console.log('got message from bkg');
        console.log(message.newUrl);
        if (message.newUrl != windURL) {
            console.log('reloading the page');
            location.reload();
        }
    }
});

