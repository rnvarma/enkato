
require("css/classroom/classroom/UnitVideoSet.scss");

var React = require('react')

var UnitVideo = require('js/classroom/classroom/UnitVideo');

module.exports = React.createClass({
    render: function() {
        var className = this.props.isActive ? "unitVideoSet active" : "unitVideoSet";
        var videos = this.props.videos.map(function(video) {
            return (
                <UnitVideo key={video.order} video={video} />
            )
        })
        return (
            <div className={className}>
                {videos}
            </div>
        )
    }
})
