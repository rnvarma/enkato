require("css/userdashboard/UserDashboard/SubscribedSeriesPanel.scss");

import React, { Component } from 'react'
import { Link } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { Circle } from 'rc-progress';

import DjangoImageLinkHandler from "js/globals/DjangoImageLinkHandler";

import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';
import { pluralize } from 'js/globals/utility';

class SubscribedSeriesPanel extends Component {
    render() {
        let katoGreen = '#79B546';

        const { series } = this.props;
        const videoData = series.user_data[0];

        const totalTime = series.total_time;

        const percentMastery = Math.round(videoData.analysis.watched / series.video_count * 100);
        const percentCompleted = Math.round(videoData.analysis.completed / series.video_count * 100);

        const numVideos = series.video_count;

        const numVideosString = numVideos + pluralize("video", numVideos);

        let nextVideo = <div></div>

        let nextVideoData = {
            uuid: 'oSqJemnEEjRbWpuPGbBDP2',
            num_quiz_questions: 2,
            thumbnail: this.props.series.thumbnails[0],
            name: "Video Panel",
            numViews: 4,
        }

        //if (this.props.nextVideo) {
        nextVideo = (
            <div className="nextVideoBtn">
                <div className="text">
                    Up Next
                </div>
                <SeriesViewerSidebarVideoPanel
                    video={nextVideo}/>
            </div>
        )
        //}


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
        return (
            <Row className="subscribedSeriesPanelRow">
                <div className="subscribedSeriesPanel">
                    <Link to={`/s/${series.uuid}`}>
                        <Col md={3} lg={3} sm={6} xs={12}>
                            <div className={"thumbnailArea" + (numVideos <= 1 ? " one" : "")}>
                                {thumbnails}
                            </div>
                        </Col>
                    </Link>
                    <Col md={3} lg={3} sm={6} xs={12}>
                        <div className="seriesInfo">
                            <div className="name">
                                {this.props.series.name}
                            </div>
                            <div className="description">
                                {this.props.series.description}
                            </div>
                        </div>
                    </Col>
                    <Col md={2} lg={2} sm={4} xs={12}>
                        <div className="progressCircleWrapper">
                            <Circle 
                                percent={percentCompleted} 
                                strokeWidth='10' 
                                strokeColor={katoGreen}
                                />
                            <div className="percentage">
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
                                strokeColor={katoGreen}
                                />
                            <div className="percentage">
                                {percentMastery}%
                            </div>
                        </div>
                        <div className="progressLabel">
                            Mastered
                        </div>
                    </Col>
                    <Col md={2} lg={2} sm={4} xs={12}>
                        <div className="numVideos">
                            {numVideosString}
                        </div>
                        <div className="totalTime">
                            {totalTime}
                        </div>
                        {nextVideo}
                    </Col>
                </div>
            </Row>
        )
    }
}

export default SubscribedSeriesPanel;