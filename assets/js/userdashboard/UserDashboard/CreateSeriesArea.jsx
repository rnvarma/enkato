
require("css/userdashboard/UserDashboard/CreateSeriesArea.scss");

var React = require('react')
var Row = require('react-bootstrap').Row;

var CreateSeriesModal = require('js/globals/CreateSeriesModal')

module.exports = React.createClass({
    render: function() {
        return (
            <div className="createSeriesArea">
                <div className="title">
                    {this.props.name}
                </div>
                <div className="mainArea">
                    <div>You have not yet created a series. Try it!</div>
                    <div><CreateSeriesModal /></div>
                </div>
            </div>
        )
    }
})
