
require("css/series/seriespage/AnnotateSeriesVideoArea.scss");

var React = require('react')
var VideoPlayer = require('js/globals/VideoPlayer/VideoPlayer');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="annotateSeriesVideoArea">
                <div className="name">
                    {this.props.currentVideo.name}
                </div>
                <div className="video">
                    <VideoPlayer
                        videoUUID={this.props.currentVideo.uuid}/>
                </div>
            </div>
        )
    }
})
