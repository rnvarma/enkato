
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
                    unsavedQuiz={this.props.unsavedQuiz}
                    publishQuiz={this.props.publishQuiz}
                    setUnsavedQuiz={this.props.setUnsavedQuiz}
                    closeAnnotationModal={this.props.closeAnnotationModal}/>
            )
        } else {
            editingBody = (
                <div className="video">
                    <EditVideoPlayer 
                        videoUUID={this.props.currentVideo.uuid}
                        unsavedTopics={this.props.unsavedTopics}
                        publishTopics={this.props.publishTopics}
                        setUnsavedTopics={this.props.setUnsavedTopics}
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