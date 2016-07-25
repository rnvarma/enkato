
require("css/series/seriespage/SeriesMainArea.scss");

import React, { Component } from 'react';
import { Link } from 'react-router'
import Button from 'react-bootstrap/lib/Button';

import { pluralize } from 'js/globals/utility';

import NoVideosArea from 'js/series/seriespage/NoVideosArea';
import SeriesVideoList from 'js/series/seriespage/SeriesVideoList';
import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';

export default class SeriesMainArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const img_src = this.props.image || DjangoImageLinkHandler('blank_thumbnail.png')
        var noVideos=false; 
        //noVideos^^ is used to get rid of the border on the right side
        //of the totalSeconds if there's no Videos
        if (this.props.videos.length == 0) {
            var video_area = <NoVideosArea
                                 videos={this.props.videos}
                                 reloadPageData={this.props.reloadPageData}
                                 openModal={this.props.openModal}/>
            var annotateVideosButton = null;
            noVideos=true;
        } else if (this.props.is_creator) {
            var video_area = (
                <div>
                    <SeriesVideoList
                        videos={this.props.videos}
                        seriesUUID={this.props.seriesUUID}
                        is_creator={this.props.is_creator}/>
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
        } else {
            var video_area = (
                <div>
                    <SeriesVideoList
                        videos={this.props.videos}
                        seriesUUID={this.props.seriesUUID}
                        is_creator={this.props.is_creator}/>
                </div>
            )
            
            if (this.props.is_subscribed) {
                var annotateVideosButton = (
                    <div className="annotate-box">
                        <Button 
                            className="unsubscribeButton" 
                            onClick={this.props.onUnsubscribe}>
                            Unsubscribe
                        </Button>
                    </div>
                )
            } else {
                var annotateVideosButton = (
                    <div className="annotate-box">
                        <Button  
                            className="subscribeButton" 
                            onClick={this.props.onSubscribe}>
                            Subscribe
                        </Button>
                    </div>
                )
            }
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
                                <Link to={`/userprofile/${this.props.creator.user_id}`}>{this.props.creator.name}</Link>
                            </div>
                            <div className="num-videos">
                                {this.props.num_videos} {pluralize("video", this.props.num_videos)}
                            </div>
                            <div 
                                className="num-mins"
                                id={noVideos?"noVideos":""}>
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
