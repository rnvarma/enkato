
require("css/userprofile/profile/ProfileSeriesPanel.scss");

var React = require('react')
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

module.exports = React.createClass({
    onClick: function() {
        window.location.href = "/s/" + this.props.series.uuid
    },
    render: function() {
        var thumbnails = this.props.series.thumbnails.map(function(s) {
            return (
                <img src={s} className="image"/>
            )
        })
        return (
            <Col md={4} lg={3} sm={6} xs={12} className="profileSeriesPanelCol">
                <div className="profileSeriesPanel" onClick={this.onClick}>
                    <div className="thumbnailArea">
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
            </Col>
        )
    }
})