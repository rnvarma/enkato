require('css/series/seriespage/SeriesVideoPanel.scss');

import React, { Component } from 'react';
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome';

import { pluralize } from 'js/globals/utility';

export default class SeriesVideoPanel extends Component {
    render() {
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
                        <Link to={`/s/${this.props.seriesUUID}/watch#${video.uuid}`}>
                            <img src={video.thumbnail} className="thumbnailImg"/>
                        </Link>
                    </div>
                    <div className="info">
                        <div className="name">
                            <Link to={`/s/${this.props.seriesUUID}/watch#${video.uuid}`}>{video.name}</Link>
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
}