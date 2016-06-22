require('bootstrap-loader'); 
require("css/globals/VideoPlayer/Video")
var React = require('react')
var ReactDOM = require('react-dom')
var YouTubeIframeLoader = require('youtube-iframe');

var player;



function onPlayerReady(event) {
}

function onPlayerStateChange(event) {
  console.log("onStateChange")
}

// function getPlayer(){
//     return new YT.Player('player', {
//         height: '100%',
//         width: '100%',
//         videoId: 'EU8L9SMH8K0',
//         playerVars: { 'autoplay': 1, 'controls': 1 },
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//             }
//         })
// }

module.exports = {
    /*
    *Plays Video
    */
    play:function(){
        player.playVideo();
        console.log(" play video")
    },

    /*
    * Pauses Video
    */
    pause:function(){
        player.pauseVideo();
        console.log("pause")
    },

    /*
    * Determines whether or not video is paused
    *
    * Return: Boolean
    *   False if video is paused
    *   True otherwise
    */
    paused:function(){
        console.log("paused")
        return (player.getPlayerState==2)
    },

    /*
    * Seeks video to given number of seconds
    *
    * Param: int seconds
    */
    seekTo:function(seconds){
        console.log("seekTo:" + seconds)
        player.seekTo(seconds)
    },

    /*
    * Returns current time in video
    *
    * Return: int seconds
    */
    getCurrentTime:function(){
        console.log("getCurrentTime")
        return player.getCurrentTime()
    },

    /*
    * Returns the duration in seconds of the currently playing video
    *
    * Return: int seconds
    */
    getDuration:function(){
        console.log("getDuration")
        return player.getDuration()
    },

    /*
    * Returns the embed code for the currently loaded/playing video
    * 
    * Return: String embedCode
    */
    getVideoEmbedCode:function(){
        console.log("getVideoEmbedCode")
        return player.getVideoEmbedCode();
    },

    /*
    * Returns the URL for the current video
    *
    * Return: String url
    */
    getVideoURL:function(){
        console.log("getVideoURL")
        return player.getVideoURL();
    },

    /*
    * Sets the Volume
    *
    * Param: Accepts integer from 0 to 1 -- inclusive
    */
    setVolume:function(vol){
        console.log("setVolume")
        return player.setVolume(vol*100)
    },

    componentDidMount: function() {
        console.log("hey----------------------")
        var loadPlayer = function(YT) {
            console.log
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: 'M7lc1UVf-VE',
                autoplay: 1,
            });
        }
        YouTubeIframeLoader.load(loadPlayer)
    },


    initializePlayer:function(){
        // console.log("initializePlayer")

        // setTimeout(function(){
        //     player=getPlayer();
        //     playerReady=true;
        // }, 1000)

    },

    /*
    * Renders Video Frame
    */
    renderVideo:function(){
        return(
            <div className="iframeWrapper">
                <div id="player"></div>
            </div>
        )
    }
}