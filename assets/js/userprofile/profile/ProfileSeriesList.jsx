
require("css/userprofile/profile/ProfileSeriesList.scss");

var React = require('react')
var ProfileSeriesPanel = require('js/userprofile/profile/ProfileSeriesPanel');
var Row = require('react-bootstrap').Row;

module.exports = React.createClass({
    render: function() {
        var seriesPanels = this.props.data.series.map(function(series) {
            return (
                <ProfileSeriesPanel
                    series={series}/>
            )
        })
        return (
            <Row className="profileSeriesList">
                {seriesPanels}
            </Row>
        )
    }
})
