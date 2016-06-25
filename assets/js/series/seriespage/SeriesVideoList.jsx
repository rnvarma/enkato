
require("css/series/seriespage/SeriesVideoList.scss");

var React = require('react')

var SeriesVideoPanel = require('js/series/seriespage/SeriesVideoPanel');

module.exports = React.createClass({
    render: function() {
        var videoPanels = this.props.data.videos.map(function(v) {
            return (
                <SeriesVideoPanel key={v.order} video={v}/>
            )
        })
        return (
            <div className="seriesVideoList">
                {videoPanels}
            </div>
        )
    }
})
