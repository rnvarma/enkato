
require("css/series/seriespage/AnnotateSeriesVideoArea.scss");

var React = require('react')
var EditVideoPlayer = require('js/globals/EditVideoPlayer/EditVideoPlayer');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="annotateSeriesVideoArea">
                <div className="name">
                    {this.props.currentVideo.name}
                </div>
                <div className="video">
                    <EditVideoPlayer
                        videoUUID={this.props.currentVideo.uuid}/>
                </div>
            </div>
        )
    }
})
