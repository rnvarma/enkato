
require("css/series/seriespage/SeriesMainArea.scss");

var React = require('react')

var NoVideosArea = require('js/series/seriespage/NoVideosArea');
var SeriesVideoList = require('js/series/seriespage/SeriesVideoList');

module.exports = React.createClass({
    render: function() {
        img_src = this.props.data.image || '/static/imgs/blank_thumbnail.png'
        if (this.props.data.videos.length == 0) {
            var video_area = <NoVideosArea
                                data={this.props.data}
                                reloadPageData={this.props.reloadPageData}/>
        } else {
            var video_area = <SeriesVideoList data={this.props.data}/>
        }
        return (
            <div className="seriesMainArea">
                <div className="header">
                    <div className="picture-area">
                        <img src={img_src} className="picture"/>
                    </div>
                    <div className="metadata-area">
                        <div></div>
                        <div className="name">
                            {this.props.data.name}
                        </div>
                        <div className="description">
                            {this.props.data.description}
                        </div>
                        <div className="stats">
                            <div className="creator">
                                <a href={"/u/" + this.props.data.creator.user_id}>{this.props.data.creator.name}</a>
                            </div>
                            <div className="num-videos">
                                {this.props.data.num_videos} videos
                            </div>
                            <div className="num-mins">
                                {this.props.data.total_len}
                            </div>
                        </div>
                    </div>
                </div>
                {video_area}
            </div>
        )
    }
})
