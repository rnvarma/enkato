require('css/series/seriespage/SeriesVideoPanel.scss');

import React from 'react';
import FontAwesome from 'react-fontawesome';

import { pluralize } from 'js/globals/utility';

module.exports = React.createClass({
    render: function() {
        var video = this.props.video;
        if (video.order == 0) {
            var rightClass = "right first";
        } else {
            var rightClass = "right";
        }
        return (
            <div className="seriesVideoPanel">
                <div className="left">
                    <div className="order">
                        {video.order+1}
                    </div>
                    <div className="thumbnailArea">
                        <a href={"/s/" + this.props.s_id + "/watch#" + video.uuid}>
                            <img src={video.thumbnail} className="thumbnailImg"/>
                        </a>
                    </div>
                    <div className="info">
                        <div className="name">
                            <a href={"/s/" + this.props.s_id + "/watch#" + video.uuid}>{video.name}</a>
                        </div>
                        <div className="creator">
                            <span className={"seperator" + (this.props.is_creator && !video.num_topics ? " alertAnnotate" : "")}>
                                <FontAwesome
                                    name="exclamation-circle"
                                    className="alertIcon"/>
                                {video.num_topics} {pluralize("topic", video.num_topics)}
                            </span>
                            <span className={"seperator" + (this.props.is_creator && !video.num_quiz_questions ? " alertAnnotate" : "")}>
                                <FontAwesome 
                                    name="exclamation-circle" 
                                    className="alertIcon"/>
                                {video.num_quiz_questions} quiz {pluralize("question", video.num_quiz_questions)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={rightClass}>
                    <div className="numViews">
                        {video.num_views} {pluralize("view", video.num_views)}
                    </div>
                    <div className="time">
                        {video.duration_san}
                    </div>
                </div>
            </div>
        )
    }
})
