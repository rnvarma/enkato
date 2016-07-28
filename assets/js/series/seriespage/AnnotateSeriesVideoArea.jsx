
require("css/series/seriespage/AnnotateSeriesVideoArea.scss");

import React, { Component } from 'react';

import EditVideoPlayer from 'js/globals/EditVideoPlayer/EditVideoPlayer';
import QuizAddingForm from 'js/globals/QuizAddingForm/QuizAddingForm';

export default class AnnotateSeriesVideoArea extends Component {
    render() {
        var editingBody;
        if(this.props.quizMode){
            editingBody = (
                <QuizAddingForm 
                    videoUUID={this.props.currentVideo.uuid}/>
            )
        } else {
            editingBody = (
                <div className="video">
                    <EditVideoPlayer 
                        videoUUID={this.props.currentVideo.uuid}
                        setAnnotationsToSave={this.props.setAnnotationsToSave}
                        setKeepAnnotations={this.props.setKeepAnnotations}
                        annotationsToSave={this.props.annotationsToSave}
                        showingAnnotationSave={this.props.showingAnnotationSave}
                        onConfirmQuit={this.props.onConfirmQuit}
                        publishAnnotations={this.props.publishAnnotations}
                        closeAnnotationsModal={this.props.closeAnnotationsModal}
                    />
                </div>
            )
        }
        return (
            <div className="annotateSeriesVideoArea">
                {editingBody}
            </div>
        )
    }
}