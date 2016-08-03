import React, { Component } from 'react'
import SubscribedSeriesPanel from 'js/userdashboard/UserDashboard/SubscribedSeriesPanel';
import Row from 'react-bootstrap/lib/Row';

export default class SubscribedSeriesList extends Component {
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
                <Row className="titledPanel">
                    {seriesPanels}
                </Row>
            </div>
        )
    }
}