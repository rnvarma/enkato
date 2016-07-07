
require("css/series/seriespage/SeriesMainArea.scss");

var React = require('react')

import { Button } from 'react-bootstrap';

import { pluralize } from 'js/globals/utility';

import NoVideosArea from 'js/series/seriespage/NoVideosArea';
import SeriesVideoList from 'js/series/seriespage/SeriesVideoList';

export default class SeriesMainArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const img_src = this.props.data.image || '/static/imgs/blank_thumbnail.png'
        if (this.props.data.videos.length == 0) {
            var video_area = <NoVideosArea
                                 data={this.props.data}
                                 reloadPageData={this.props.reloadPageData}
                                 openModal={this.props.openModal}/>
            var annotateVideosButton = "";
        } else {
            var video_area = (
                <div>
                    <SeriesVideoList data={this.props.data} />
                    <NoVideosArea
                        data={this.props.data}
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
                            {this.props.data.name}
                        </div>
                        <div className="description">
                            {this.props.data.description}
                        </div>
                        <div className="stats">
                            <div className="creator">
                                <a href={"/userprofile/" + this.props.data.creator.user_id}>{this.props.data.creator.name}</a>
                            </div>
                            <div className="num-videos">
                                {this.props.data.num_videos} {pluralize("video", this.props.data.num_videos)}
                            </div>
                            <div className="num-mins">
                                {this.props.data.total_len}
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
