
module.exports = function () {
    this.player = yt.player.getPlayerByElement('player-api');
    this.videoId = videoId;

    /*
    *Plays Video
    */
    this.play = function(){
        if (!this.player) return;
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
    this.seekTo = function(seconds) {
        if (!this.player) {
            return;
        }
        if (seconds === Math.floor(this.player.getDuration())) {
            seconds -= 0.5;
            /* YouTube bug, seeking to getDuration() floor doesn't work */
        }
        return this.player.seekTo(seconds);
    }

    /*
    * Returns current time in video
    *
    * Return: int seconds
    */
    this.getCurrentTime = function(){
        if (!this.player) return 0;
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

    this.ended = function() {
        if (this.player) {
            return (this.player.getPlayerState() === 0);
        }
        return;
    }
}
