
require("css/series/seriespage/SeriesMainArea.scss");

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import Button from 'react-bootstrap/lib/Button';

import ConfirmModal from 'js/globals/ConfirmModal';
import { pluralize } from 'js/globals/utility';

import auth from 'auth';
import request from 'js/globals/HttpRequest';
import NoVideosArea from 'js/series/seriespage/NoVideosArea';
import SeriesVideoList from 'js/series/seriespage/SeriesVideoList';
import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';

export default class SeriesMainArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleting: false,
        };

        this.delete = this.delete.bind(this);
        this.setPublic = this.setPublic.bind(this);
        this.setPrivate = this.setPrivate.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    delete() {
        request.delete(`/1/series/${this.props.seriesUUID}`, {
            success: (data) => {
                browserHistory.push("/")
            }
        })
    }

    setPublic() {
        this.props.setIsPrivate(false);
    }

    setPrivate() {
        this.props.setIsPrivate(true);
    }

    toggleDelete() {
        this.setState({
            deleting: !this.state.deleting
        })
    }
    render() {
        const img_src = this.props.image || DjangoImageLinkHandler('blank_thumbnail.png')
        var noVideos=false; 

        var privacyButton = <div></div>
        var deleteButton = <div></div>

        //noVideos^^ is used to get rid of the border on the right side
        //of the totalSeconds if there's no Videos
        if (this.props.videos.length == 0) {
            var video_area = <NoVideosArea
                                 videos={this.props.videos}
                                 reloadPageData={this.props.reloadPageData}
                                 openModal={this.props.openModal}
                                 isCreator={this.props.is_creator}/>
            var annotateVideosButton = null;
            noVideos=true;
            if(this.props.is_creator) {
                if(this.props.is_private){
                    privacyButton = (
                        <div className="privacyButton">
                            <Button onClick={this.setPublic}>
                                Private
                            </Button>
                        </div>
                    );
                } else {
                    privacyButton = (
                        <div className="privacyButton">
                            <Button onClick={this.setPrivate}>
                                Public
                            </Button>
                        </div>
                    );
                }
                deleteButton = (
                    <div className="deleteButton">
                        <Button onClick={this.toggleDelete}>
                            Delete
                        </Button>
                    </div>
                )
            }
        } else if (this.props.is_creator) {
            var video_area = (
                <div>
                    <SeriesVideoList
                        videos={this.props.videos}
                        seriesUUID={this.props.seriesUUID}
                        is_creator={this.props.is_creator}
                        makeVideoPublic={this.props.makeVideoPublic}
                        makeVideoPrivate={this.props.makeVideoPrivate}
                        loadPageData={this.props.loadPageData}/>
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
            if(this.props.is_private){
                privacyButton = (
                    <div className="privacyButton">
                        <Button onClick={this.setPublic}>
                            Private
                        </Button>
                    </div>
                );
            } else {
                privacyButton = (
                    <div className="privacyButton">
                        <Button onClick={this.setPrivate}>
                            Public
                        </Button>
                    </div>
                );
            }
            deleteButton = (
                <div className="deleteButton">
                    <Button onClick={this.toggleDelete}>
                        Delete
                    </Button>
                </div>
            );
            
        } else {
            var video_area = (
                <div>
                    <SeriesVideoList
                        videos={this.props.videos}
                        seriesUUID={this.props.seriesUUID}
                        is_creator={this.props.is_creator}
                        loadPageData={this.props.loadPageData}/>
                </div>
            )
             
            if (auth.loggedIn() && this.props.is_subscribed) {
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
                <ConfirmModal
                    showing = {this.state.deleting}
                    description = "You're deleting this series. Are you sure you want to continue? This is irreversible."
                    acceptText = "Delete"
                    acceptBsStyle = "danger"
                    acceptCallback = {this.delete}
                    cancelCallback = {this.toggleDelete}/>
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
                            {privacyButton}
                            {deleteButton}
                        </div>
                    </div>
                </div>
                {video_area}
            </div>
        );
    }
}
