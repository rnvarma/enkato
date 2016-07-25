
require("css/userprofile/profile/ProfileSeriesList.scss");

import React, { Component } from 'react'
import ProfileSeriesPanel from 'js/userprofile/profile/ProfileSeriesPanel';
import Row from 'react-bootstrap/lib/Row';

export default class ProfileSeriesList extends Component {
    render() {
        var seriesPanels = this.props.series.map(function(series) {
            return (
                <ProfileSeriesPanel
                    key={series.uuid}
                    series={series}/>
            )
        })
        return (
            <div className="profileSeriesList">
                <div className="title">
                    {this.props.name}
                </div>
                <Row className="panels">
                    {seriesPanels}
                </Row>
            </div>
        )
    }
}