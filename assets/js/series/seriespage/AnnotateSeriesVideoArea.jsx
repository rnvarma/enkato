
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
                    setUnsaved={this.props.setUnsavedQuiz}
                    setOnConfirmSave={this.props.setOnConfirmSave}
                    closeAnnotationModal={this.props.closeAnnotationModal}
                    cancelSave={this.props.cancelSave}/>
            );
        } else {
            editingBody = (
                <div className="video">
                    <EditVideoPlayer
                        videoUUID={this.props.currentVideo.uuid}
                        setUnsaved={this.props.setUnsavedTopics}
                        setOnConfirmSave={this.props.setOnConfirmSave}/>
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