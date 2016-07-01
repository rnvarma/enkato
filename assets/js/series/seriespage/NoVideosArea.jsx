
require("css/series/seriespage/NoVideosArea.scss");

var React = require('react')

var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
    render: function() {
        var hasVideos = (this.props.data.videos.length > 0)
        var title = hasVideos ? "Add more videos to this series." : "This series is currently empty."
        var overAllClass = hasVideos ? "noVideosArea hasVideos" : "noVideosArea"

        return (
            <div className={overAllClass}>
                <div>{title}</div>
                <div className="addVideo">
                    <Button onClick={this.props.openModal.bind(null, false)}
                        className="addVideoBtn">Import Video(s)</Button>
                </div>
            </div>
        )
    }
})
