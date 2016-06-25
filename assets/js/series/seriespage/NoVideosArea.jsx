
require("css/series/seriespage/NoVideosArea.scss");

var React = require('react')

module.exports = React.createClass({
    render: function() {
        return (
            <div className="noVideosArea">
                This series is currently empty.
            </div>
        )
    }
})
