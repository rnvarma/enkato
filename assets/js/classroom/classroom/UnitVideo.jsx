
require("css/classroom/classroom/UnitVideo.scss");

var React = require('react')

module.exports = React.createClass({
    render: function() {
        var video = this.props.video
        return (
            <div className="unitVideo">
                <div className="imgArea">
                    <img className="image" src={video.thumbnail} />
                </div>
                <div className="metaDataArea">
                    <div className="name">
                    {video.name}
                    </div>
                    <div className="creator">
                        by <a className="username" href={"/userprofile" + video.creator.user_id}>{video.creator.username}</a>
                    </div>
                    <div className="stats">
                        <div className="date">
                            {video.upload_time}
                        </div>
                        <div className="views">
                            {video.num_views} views
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
