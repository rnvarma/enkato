
require("css/series/seriespage/NoVideosArea.scss");

var React = require('react')
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
    render: function() {
        return (
            <div className="noVideosArea">
                <div>This series is currently empty.</div>
                <div className="addVideo">
                    <Button className="addVideoBtn structabl-blue">Import Video(s)</Button>
                </div>
            </div>
        )
    }
})
