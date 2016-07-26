require('bootstrap-loader');
require("css/globals/VideoPlayer/Video")

import React, { Component } from 'react';

import QuizModal from 'js/globals/VideoPlayer/QuizModal';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';


export default class Video extends Component { 
    render(){
        var height = this.props.videoDivHeight - this.props.controlBarHeight;
        var quizModal;
        quizModal = (
            <QuizModal 
                onFinishButton={this.props.onFinishButton}
                showingOverlay={this.props.showingOverlay}
                takingQuiz={this.props.takingQuiz}
                showQuiz={this.props.showQuiz}
                videoUUID={this.props.videoUUID}
                closeModal={this.props.closeModal}
                nextVideo={this.props.nextVideo}
                playVideo={this.props.playVideo}
                quizTaken={this.props.quizTaken}
                questions={this.props.questions}
                completedQuizInfo={this.props.completedQuizInfo}
                submitQuizAnswers={this.props.submitQuizAnswers}/>
        )
        return (
            <div 
                style={{height:height+"px"}}
                className="iframeWrapper">
                {this.props.renderVideo()}
                {quizModal}
            </div>
        )
    }
}