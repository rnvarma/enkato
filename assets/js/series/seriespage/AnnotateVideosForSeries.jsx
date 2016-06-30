
require("css/series/seriespage/AnnotateVideosForSeries.scss");

var React = require('react')

var AnnotateSeriesSideBar = require('js/series/seriespage/AnnotateSeriesSideBar');
var AnnotateSeriesVideoArea = require('js/series/seriespage/AnnotateSeriesVideoArea');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            currentVideo: this.props.data.videos[0]
        }
    },
    updateCurrVideo: function(id) {
        for (var i = 0; this.props.data.videos; i++) {
            if (this.props.data.videos[i].uuid == id) break
        }
        this.setState({currentVideo: this.props.data.videos[i]});
    },
    render: function() {
        return (
            <div className="annotateVideosForSeries">
                <AnnotateSeriesSideBar
                    data={this.props.data}
                    updateCurrVideo={this.updateCurrVideo}
                    currentVideo={this.state.currentVideo}/>
                <AnnotateSeriesVideoArea
                    data={this.props.data}
                    currentVideo={this.state.currentVideo}
                    quizMode={this.props.quizMode}/>
            </div>
        )
    }
})
