require("css/userprofile/profile/SubscribedSeriesList.scss");

import React, { Component } from 'react'
import SubscribedSeriesPanel from 'js/userprofile/profile/SubscribedSeriesPanel';
import Row from 'react-bootstrap/lib/Row';

export default class ProfileSeriesList extends Component {
    render() {
        var seriesPanels = this.props.series.map(function(series) {
            return (
                <SubscribedSeriesPanel
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