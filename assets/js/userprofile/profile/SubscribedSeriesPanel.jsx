require("css/userprofile/profile/SubscribedSeriesPanel.scss");

import React, { Component } from 'react'
import { Link } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import DjangoImageLinkHandler from "js/globals/DjangoImageLinkHandler";

class ProfileSeriesPanel extends Component {
    render() {
        var thumbnails = this.props.series.thumbnails.map(function(s) {
            return (
                <img
                    key={s}
                    src={s}
                    className="image"/>
            )
        })
        if (this.props.series.thumbnails.length == 0) {
            thumbnails = (
                <img src={DjangoImageLinkHandler("blank_thumbnail.png")} className="image" />
            )
        }
        var numVideos = this.props.series.thumbnails.length;
        return (
            <Row className="subscribedSeriesPanelRow">
                    <div className="subscribedSeriesPanel">
                        <Link to={`/s/${this.props.series.uuid}`}>
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
                    </div>
            </Row>
        )
    }
}

module.exports = ProfileSeriesPanel;