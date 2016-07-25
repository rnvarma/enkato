
require("css/userprofile/profile/ProfileSeriesPanel.scss");

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
            <Col md={4} lg={3} sm={6} xs={12} className="profileSeriesPanelCol">
                <Link to={`/s/${this.props.series.uuid}`}>
                    <div className="profileSeriesPanel">
                        <div className={"thumbnailArea" + (numVideos <= 1 ? " one" : "")}>
                            {thumbnails}
                        </div>
                        <div className="seriesInfo">
                            <div className="name">
                                {this.props.series.name}
                            </div>
                            <div className="description">
                                {this.props.series.description}
                            </div>
                        </div>
                    </div>
                </Link>
            </Col>
        )
    }
}

module.exports = ProfileSeriesPanel;