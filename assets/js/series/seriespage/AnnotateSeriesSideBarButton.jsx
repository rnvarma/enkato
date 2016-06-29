
require("css/series/seriespage/AnnotateSeriesSideBarButton.scss");

var React = require('react')

module.exports = React.createClass({
    onClick: function() {
        this.props.updateCurrVideo(this.props.video.uuid);
    },
    render: function() {
        var activeClass = this.props.isCurrVideo ? "active" : ""
        return (
            <div className={"annotateSeriesSideBarButton " + activeClass} onClick={this.onClick}>
                <div className="buttonContainer">
                    <img className="image" src={this.props.video.thumbnail}/>
                    <div className="name">
                        {this.props.video.name}
                    </div>
                    <div className="shadow">
                    </div>
                </div>
            </div>
        )
    }
})
