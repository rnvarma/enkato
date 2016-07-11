
require("css/series/seriespage/SeriesMainArea.scss");

var React = require('react')

import { Button } from 'react-bootstrap';

import { pluralize } from 'js/globals/utility';

import NoVideosArea from 'js/series/seriespage/NoVideosArea';
import SeriesVideoList from 'js/series/seriespage/SeriesVideoList';
var DjangoImageLinkHandler = require('js/globals/DjangoImageLinkHandler')

export default class SeriesMainArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const img_src = this.props.image || DjangoImageLinkHandler('blank_thumbnail.png')
        if (this.props.videos.length == 0) {
            var video_area = <NoVideosArea
                                 videos={this.props.videos}
                                 reloadPageData={this.props.reloadPageData}
                                 openModal={this.props.openModal}/>
            var annotateVideosButton = "";
        } else {
            var video_area = (
                <div>
                    <SeriesVideoList videos={this.props.videos} />
                    <NoVideosArea
                        videos={this.props.videos}
                        openModal={this.props.openModal}/>
                </div>
            )
            var annotateVideosButton =  (
                <div className="annotate-box">
                    <Button onClick={this.props.openModal.bind(null, true)}>
                        Annotate Video(s)
                    </Button>
                </div>
            );
        }
        return (
            <div className="seriesMainArea">
                <div className="header">
                    <div className="picture-area">
                        <img src={img_src} className="picture"/>
                    </div>
                    <div className="metadata-area">
                        <div className="name">
                            {this.props.name}
                        </div>
                        <div className="description">
                            {this.props.description}
                        </div>
                        <div className="stats">
                            <div className="creator">
                                <a href={"/userprofile/" + this.props.creator.user_id}>{this.props.creator.name}</a>
                            </div>
                            <div className="num-videos">
                                {this.props.num_videos} {pluralize("video", this.props.num_videos)}
                            </div>
                            <div className="num-mins">
                                {this.props.total_len}
                            </div>
                            {annotateVideosButton}
                        </div>
                    </div>
                </div>
                {video_area}
            </div>
        );
    }
}
