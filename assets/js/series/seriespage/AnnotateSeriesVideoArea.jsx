
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
                        videoUUID={this.props.currentVideo.uuid}/>
                </div>
            )
        }
        return (
            <div className="annotateSeriesVideoArea">
                <div className="name">
                    {this.props.currentVideo.name}
                </div>
                {editingBody}
            </div>
        )
    }
}