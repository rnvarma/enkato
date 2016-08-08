import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import { Link, browserHistory } from 'react-router'
import Button from 'react-bootstrap/lib/Button';

import ConfirmModal from 'js/globals/ConfirmModal';
import EditSeriesModal from 'js/globals/EditSeriesModal';
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
        var img_src = (
            <img src={DjangoImageLinkHandler("blank_thumbnail.png")} className="image"/>
        )
        if (this.props.thumbnails) {
            img_src = this.props.thumbnails.map((img, index) => {
                return (
                    <img key={index} src={img} className="image"/>
                )
            })
        }
        var noVideos=false; 

        var privacyButton = <div></div>
        var deleteButton = <div></div>
        var editButton = <div></div>

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
                        openModal={this.props.openModal}
                        isCreator={this.props.is_creator}
                        reloadPageData={this.props.reloadPageData}/>
                </div>
            )
            var annotateVideosButton =  (
                <Button
                    className="btn-primary"
                    onClick={this.props.openModal.bind(null, true)}>
                    Annotate
                </Button>
            );
            if(this.props.is_private){
                privacyButton = (
                    <Button
                        className="btn-secondary"
                        onClick={this.setPublic}
                        title="Make Series Public">
                        Private
                    </Button>
                );
            } else {
                privacyButton = (
                    <Button
                        className="btn-secondary"
                        onClick={this.setPrivate}
                        title="Make Series Private">
                        Public
                    </Button>
                );
            }
            deleteButton = (
                <Button
                    className="btn-danger muted"
                    onClick={this.toggleDelete}
                    title="Delete This Series">
                    Delete
                </Button>
            );
            editButton = <EditSeriesModal seriesUUID = {this.props.seriesUUID} name = {this.props.name} description = {this.props.description} loadPageData = {this.props.loadPageData}/>
            
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
                    <Button 
                        className="btn-secondary" 
                        onClick={this.props.onUnsubscribe}>
                        Unsubscribe
                    </Button>
                )
            } else {
                var annotateVideosButton = (
                    <Button  
                        className="btn-primary" 
                        onClick={this.props.onSubscribe}>
                        Subscribe
                    </Button>
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
                <div className="header baseContainer">
                    <Row>
                        <div className="thumbnailArea col-lg-3 col-md-4 col-sm-12">
                            {img_src}
                        </div>
                        <div className="imageInfo col-lg-6 col-md-7 col-sm-12">
                            <div className="title">
                                {this.props.name}
                            </div>
                            <div className="metadata">
                                <div className="creator metaItem">
                                    <Link to={`/userprofile/${this.props.creator.user_id}`}>{this.props.creator.name}</Link>
                                </div>
                                <div className="num-videos metaItem">
                                    {this.props.num_videos} {pluralize("video", this.props.num_videos)}
                                </div>
                                <div 
                                    className="num-mins metaItem"
                                    id={noVideos?"noVideos":""}>
                                    {this.props.total_len}
                                </div>
                            </div>
                            <div className="description">
                                {this.props.description}
                            </div>
                            <div className="annotate-box">
                                {annotateVideosButton}
                                {privacyButton}
                                {deleteButton}
                                {editButton}
                            </div>
                        </div>
                    </Row>
                </div>
                {video_area}
            </div>
        );
    }
}
