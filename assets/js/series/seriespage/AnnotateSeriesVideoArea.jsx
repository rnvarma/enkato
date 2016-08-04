
require("css/series/seriespage/AnnotateSeriesVideoArea.scss");

import React, { Component } from 'react';

import EditVideoPlayer from 'js/globals/EditVideoPlayer/EditVideoPlayer';
import QuizAddingForm from 'js/globals/QuizAddingForm/QuizAddingForm';

export default class AnnotateSeriesVideoArea extends Component {
    render() {
        let editingBody;
        if (this.props.quizMode) {
            editingBody = (
                <QuizAddingForm
                    videoUUID={this.props.currentVideo.uuid}
                    readyToPublish={this.props.readyToPublish}
                    setUnsaved={this.props.setUnsavedQuiz}
                    cancelPublish={this.props.cancelPublish}
                    closeAnnotationModal={this.props.closeAnnotationModal}/>
            );
        } else {
            editingBody = (
                <div className="video">
                    <EditVideoPlayer
                        videoUUID={this.props.currentVideo.uuid}
                        readyToPublish={this.props.readyToPublish}
                        setUnsaved={this.props.setUnsavedTopics}
                        cancelPublish={this.props.cancelPublish}
                        closeAnnotationModal={this.props.closeAnnotationModal}/>
                </div>
            );
        }

        return (
            <div className="annotateSeriesVideoArea">
                {editingBody}
            </div>
        );
    }
}