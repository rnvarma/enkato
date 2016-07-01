
require("css/series/seriespage/AnnotateSeriesSideBar.scss");

var React = require('react')

var AnnotateSeriesSideBarButton = require('js/series/seriespage/AnnotateSeriesSideBarButton');
var ScrollArea = require('react-scrollbar')

module.exports = React.createClass({
    render: function() {
        var updateCurrVideo = this.props.updateCurrVideo;
        var currVideoID = this.props.currentVideo.uuid;
        var sideButtons = this.props.data.videos.map(function(v) {
            var isCurrVideo = (currVideoID == v.uuid)
            return (
                <AnnotateSeriesSideBarButton
                    video={v}
                    key={v.order}
                    updateCurrVideo={updateCurrVideo}
                    isCurrVideo={isCurrVideo}
                />
            );
        });
        
        return (
            <ScrollArea className="annotateSeriesSideBar">
                {sideButtons}
            </ScrollArea>
        );
    }
});
