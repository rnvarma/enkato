
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
                    videoUUID={this.props.currentVideo.uuid}
                    publishQuiz={this.props.publishQuiz}
                    setUnsaved={this.props.setUnsavedQuiz}
                    closeAnnotationModal={this.props.closeAnnotationModal}/>
            )
        } else {
            editingBody = (
                <div className="video">
                    <EditVideoPlayer 
                        videoUUID={this.props.currentVideo.uuid}
                        publishTopics={this.props.publishTopics}
                        setUnsaved={this.props.setUnsavedTopics}
                        closeAnnotationModal={this.props.closeAnnotationModal}/>
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