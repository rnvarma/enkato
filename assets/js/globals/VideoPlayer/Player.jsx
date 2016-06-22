require('bootstrap-loader'); 
require("css/globals/VideoPlayer/Video")
var React = require('react')
var ReactDOM = require('react-dom')
var YouTubeIframeLoader = require('youtube-iframe');

module.exports = function (videoId) {

    this.player;
    this.videoId = videoId;

    this.init = function(videoId) {
        var this2 = this
        var loadPlayer = function(YT) {
            this2.player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                autoplay: 1,
            });
            console.log(this2.player)
        }
        YouTubeIframeLoader.load(loadPlayer)
    }
    this.init(this.videoId)

    /*
    *Plays Video
    */
    this.play = function(){
        if (!this.player) return;
        return this.player.playVideo();
    }

    /*
    * Pauses Video
    */
    this.pause = function(){
        if (!this.player) return;
        return this.player.pauseVideo();
    }

    /*
    * Determines whether or not video is paused
    *
    * Return: Boolean
    *   False if video is paused
    *   True otherwise
    */
    this.paused = function(){
        if (!this.player) return;
        return (this.player.getPlayerState==2)
    }

    /*
    * Seeks video to given number of seconds
    *
    * Param: int seconds
    */
    this.seekTo = function(seconds){
        if (!this.player) return;
        return this.player.seekTo(seconds)
    }

    /*
    * Returns current time in video
    *
    * Return: int seconds
    */
    this.getCurrentTime = function(){
        if (!this.player || !this.player.getCurrentTime) return 0;
        return this.player.getCurrentTime()
    }

    /*
    * Returns the duration in seconds of the currently playing video
    *
    * Return: int seconds
    */
    this.getDuration = function(){
        if (!this.player || !this.player.getDuration) return 0;
        return this.player.getDuration()
    }

    /*
    * Returns the embed code for the currently loaded/playing video
    * 
    * Return: String embedCode
    */
    this.getVideoEmbedCode = function(){
        if (!this.player) return "";
        return this.player.getVideoEmbedCode();
    }

    /*
    * Returns the URL for the current video
    *
    * Return: String url
    */
    this.getVideoURL = function(){
        if (!this.player) return "";
        return this.player.getVideoURL();
    }

    /*
    * Sets the Volume
    *
    * Param: Accepts integer from 0 to 1 -- inclusive
    */
    this.setVolume = function(vol){
        if (!this.player) return;
        return this.player.setVolume(vol*100)
    }

    /*
    * Renders Video Frame
    */
    this.renderVideo = function(){
        return(
            <div className="iframeWrapper">
                <div id="player"></div>
            </div>
        )
    }
}