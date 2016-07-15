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
                playerVars: { 
                    'rel': 0, 
                    'autoplay': 1, 
                    'controls': 0,
                    'fs': 0,
                    'iv_load_policy': 3,
                    'modestbranding': 1,
                    'showinfo': 0
                },
            });
        }
        YouTubeIframeLoader.load(loadPlayer)
    }
    this.init(this.videoId) 

    this.destroy = function() {
        if (!this.player) return;
        this.player.destroy();
    }

    /*
    *Plays Video
    */
    this.play = function(){
        console.log("im playing")
        console.log(this)
        if (!this.player) return;
        console.log("im playing2")
        return this.player.playVideo();
    }

    this.getContext = function(){
        return this;
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
        if (!this.player || !this.player.getPlayerState) return;
        return (this.player.getPlayerState()==2)
    }

    /*
    * Seeks video to given number of seconds
    *
    * Param: int seconds
    */
    this.seekTo = function(seconds){
        if (!this.player) return;
        if (seconds == Math.floor(this.player.getDuration())) {
            seconds -= 0.5; /* YouTube bug, seeking to getDuration() floor doesn't work */
        }
        console.log(seconds)
        return this.player.seekTo(seconds);
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
    * Sets the Playback Rate
    *
    * Param: Accepts integers - 0.25, 0.5, 1, 1.5, 2
    */
    this.setPlaybackRate = function(rate, this2){
        if(!this2) this2 = this;
        if (!this2.player) return;
        return this2.player.setPlaybackRate(rate)
    }

    /*
    * Gets the Playback Rate
    *
    * Return: integers - 0.25, 0.5, 1, 1.5, 2
    */
    this.getPlaybackRate = function(){
        if (!this.player) return;
        return this.player.getPlaybackRate()
    }

    /*
    * Renders Video Frame
    */
    this.renderVideo = function(){
        return(
            <div id="player" data-vid={this.videoId}></div>
        )
    }
}
