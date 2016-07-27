import React, { Component } from 'react'
import { Link } from 'react-router';

import Dotdotdot from 'react-dotdotdot';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import DjangoImageLinkHandler from "js/globals/DjangoImageLinkHandler";

class ProfileSeriesPanel extends Component {
    render() {
        const { series } = this.props;

        let thumbnails = series.thumbnails.map(function(source, index) {
            return (
                <img
                    key={index}
                    src={source}
                    className="image"/>
            );
        });
        if (series.thumbnails.length === 0) {
            thumbnails = (
                <img src={DjangoImageLinkHandler("blank_thumbnail.png")} className="image" />
            )
        }
        const numVideos = series.thumbnails.length;
        return (
            <Col md={4} lg={3} sm={6} xs={12} className="profileSeriesPanelCol">
                <Link to={`/s/${series.uuid}`}>
                    <div className="profileSeriesPanel">
                        <div className={"thumbnailArea" + (numVideos <= 1 ? " one" : "")}>
                            {thumbnails}
                        </div>
                        <div className="seriesInfo">
                            <Dotdotdot className="name" clamp={1}>
                                {series.name}
                            </Dotdotdot>
                            <Dotdotdot className="description" clamp={5}>
                                {series.description}
                            </Dotdotdot>
                        </div>
                    </div>
                </Link>
            </Col>
        )
    }
}

module.exports = ProfileSeriesPanel;