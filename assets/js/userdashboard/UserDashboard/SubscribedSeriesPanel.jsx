import React, { Component } from 'react'
import { Link } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { Circle } from 'rc-progress';
import Dotdotdot from 'react-dotdotdot';

import DjangoImageLinkHandler from "js/globals/DjangoImageLinkHandler";

import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';
import { pluralize } from 'js/globals/utility';

class SubscribedSeriesPanel extends Component {
    render() {
        const katoGreen = '#79B546';

        const series = this.props.series;

        const videoData = series.user_data[0];

        const totalTime = series.total_time;

        const numVideos = series.video_count;

        const numVideosString = numVideos + pluralize(' video', numVideos);

        var thumbnails = series.thumbnails.map(function(s) {
            return (
                <img
                    key={s}
                    src={s}
                    className="image"/>
            )
        })
        if (series.thumbnails.length == 0) {
            thumbnails = (
                <img src={DjangoImageLinkHandler("blank_thumbnail.png")} className="image" />
            )
        }



        let percentMastery = 0;
        let percentCompleted = 0;
        let continueVideo = null;
        let nextVideo = "";

        if(videoData){
            percentMastery = Math.round(videoData.analysis.completed / series.video_count * 100);
            percentCompleted = Math.round(videoData.analysis.watched / series.video_count * 100);

            continueVideo = videoData.videos_data[videoData.analysis.continue_video].video;

            const nextVideoData = {
                uuid: continueVideo.uuid,
                num_quiz_questions: continueVideo.question_counter,
                thumbnail: continueVideo.thumbnail,
                name: continueVideo.name,
                num_views: continueVideo.num_views,
            };
            nextVideo = (
                <div className="nextVideoBtn">
                    <div className="smallTitle">
                        Up Next
                    </div>
                    <div className="link">
                        <Link to={`/s/${this.props.series.uuid}/watch#${continueVideo.uuid}`}>
                            {continueVideo.name}
                        </Link>
                    </div>
                </div>
            )
        } else {
            nextVideo = <div></div>
        }

        







        return (
            <Row className="subscribedSeriesPanel">
                <div className="subscribedSeriesPanel">
                    <Link to={`/s/${series.uuid}`}>
                        <Col md={3} lg={3} sm={6} xs={12}>
                            <div className={"thumbnailArea" + (series.thumbnails.length <= 1 ? " one" : "")}>
                                {thumbnails}
                            </div>
                        </Col>
                    </Link>
                    <Col className="imageInfo" md={3} lg={3} sm={6} xs={12}>
                        <div className="title">
                            {this.props.series.name}
                        </div>
                        <div className="metadata">
                            <div className="numVideos metaItem bold">
                                {numVideosString}
                            </div>
                            <div className="totalTime metaItem">
                                {totalTime}
                            </div>
                        </div>
                        <Dotdotdot className="description" clamp={2}>
                            {this.props.series.description}
                        </Dotdotdot>
                    </Col>
                    <Col md={2} lg={2} sm={4} xs={12}>
                        <div className="progressCircleWrapper">
                            <Circle 
                                percent={percentCompleted} 
                                strokeWidth='10' 
                                strokeColor={katoGreen}/>
                            <div className="percentage title">
                                {percentCompleted}%
                            </div>
                        </div>
                        <div className="progressLabel">
                            Completed
                        </div>
                    </Col>
                    <Col md={2} lg={2} sm={4} xs={12}>
                        <div className="progressCircleWrapper" >
                            <Circle 
                                percent={percentMastery}
                                strokeWidth='10' 
                                strokeColor={katoGreen}/>
                            <div className="percentage title">
                                {percentMastery}%
                            </div>
                        </div>
                        <div className="progressLabel">
                            Mastered
                        </div>
                    </Col>
                    <Col md={2} lg={2} sm={4} xs={12}>
                        {nextVideo}
                    </Col>
                </div>
            </Row>
        )
    }
}

export default SubscribedSeriesPanel;