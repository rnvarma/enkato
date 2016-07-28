import React, { Component } from 'react';
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome';
import Button from 'react-bootstrap/lib/Button';


import request from 'js/globals/HttpRequest';
import ConfirmModal from 'js/globals/ConfirmModal';
import { pluralize } from 'js/globals/utility';

export default class SeriesVideoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleting: false,
            order: props.order,
        };

        this.delete = this.delete.bind(this);
        this.makePublic = this.makePublic.bind(this);
        this.makePrivate = this.makePrivate.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    delete() {
        this.setState({
            deleting: false,
        });
        request.delete(`/1/videos/${this.props.video.uuid}`, {
            success: (data) => {
                this.props.loadPageData();
            }
        })
    }

    makePublic() {
        this.props.makeVideoPublic(this.props.video.uuid);
    }

    makePrivate() {
        this.props.makeVideoPrivate(this.props.video.uuid);
    }

    toggleDelete() {
        this.setState({
            deleting: !this.state.deleting,
        });
    }


    render() {
        const { video } = this.props;
        var key = this.props.order;

        let rightClass = 'right';
        if (video.order == 0) {
            rightClass += ' first';
        }

        let deleteButton;
        let privacyButton;
        if (this.props.is_creator) {
            if (this.props.is_private) {
                privacyButton = (
                    <div className="annotate-box">
                        <Button 
                            onClick={this.makePublic}
                            disabled={this.props.reordering}>
                            Private
                        </Button>
                    </div>
                )
            } else {
                privacyButton = (
                    <div className="annotate-box">
                        <Button  
                            className="structabl-red"
                            onClick={this.makePrivate}
                            disabled={this.props.reordering}>
                            Public
                        </Button>
                    </div>
                )
            }
            deleteButton = (
                <div className = "annotate-box">
                    <Button onClick = {this.toggleDelete} disabled={this.props.reordering}>
                        Delete
                    </Button>
                </div>
            )
        }


        return (
            <div className="seriesVideoPanel">
                <ConfirmModal
                    showing={this.state.deleting}
                    description="You're deleting this video. Are you sure you want to continue? This is irreversible."
                    acceptText="Delete"
                    acceptBsStyle="danger"
                    acceptCallback={this.delete}
                    cancelCallback={this.toggleDelete}
                />
                <div className="left">
                    <div className="order">
                        {key+1}
                    </div>
                    <div className="thumbnailArea">
                        <Link to={`/s/${this.props.seriesUUID}/watch#${video.uuid}`}>
                            <img src={video.thumbnail} className="thumbnailImg"/>
                        </Link>
                    </div>
                    <div className="imageInfo info">
                        <div className="name">
                            <Link to={`/s/${this.props.seriesUUID}/watch#${video.uuid}`}>{video.name}</Link>
                        </div>
                        <div className="metadata">
                            <span className={"separator metaItem" + (this.props.is_creator && !video.num_topics ? " alertAnnotate" : "")}>
                                <FontAwesome
                                    name="exclamation-circle"
                                    className="alertIcon"/>
                                {video.num_topics} {pluralize("topic", video.num_topics)}
                            </span>
                            <span className={"separator metaItem" + (this.props.is_creator && !video.num_quiz_questions ? " alertAnnotate" : "")}>
                                <FontAwesome 
                                    name="exclamation-circle" 
                                    className="alertIcon"/>
                                {video.num_quiz_questions} quiz {pluralize("question", video.num_quiz_questions)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={rightClass}>
                    <div className="deleteButton">
                        {deleteButton}
                    </div>
                    <div className="privacyButton">
                        {privacyButton}
                    </div>
                    <div className="numViews metaItem">
                        {video.num_views} {pluralize("view", video.num_views)}
                    </div>
                    <div className="time metaItem">
                        {video.duration_san}
                    </div>
                </div>
            </div>
        )
    }
}