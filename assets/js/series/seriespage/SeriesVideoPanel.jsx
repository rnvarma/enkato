
require("css/series/seriespage/SeriesVideoPanel.scss");

var React = require('react')
import FontAwesome from 'react-fontawesome';

module.exports = React.createClass({
    onClick: function() {
        window.location.href = "/v/" + this.props.video.uuid
    },
    render: function() {
        var video = this.props.video;
        if (video.order == 0) {
            var rightClass = "right first";
        } else {
            var rightClass = "right";
        }
        return (
            <div className="seriesVideoPanel" onClick={this.onClick}>
                <div className="left">
                    <div className="order">
                        {video.order+1}
                    </div>
                    <div className="thumbnailArea">
                        <img src={video.thumbnail} className="thumbnailImg"/>
                    </div>
                    <div className="info">
                        <div className="name">
                            <a href={"/v/" + video.uuid}>{video.name}</a>
                        </div>
                        <div className="creator">
                            <span className={"seperator" + (video.num_topics ? "" : " alertAnnotate")}>
                                <FontAwesome
                                    name="exclamation-circle"
                                    className="alertIcon"/>
                                {video.num_topics} topics
                            </span>
                            <span className={"seperator" + (video.num_quiz_questions ? "" : " alertAnnotate")}>
                                <FontAwesome 
                                    name="exclamation-circle" 
                                    className="alertIcon"/>
                                {video.num_quiz_questions} quiz questions
                            </span>
                        </div>
                    </div>
                </div>
                <div className={rightClass}>
                    <div className="numViews">
                        {video.num_views} views
                    </div>
                    <div className="time">
                        {video.duration_san}
                    </div>
                </div>
            </div>
        )
    }
})
