import React, { PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';

import QuizForm from 'js/globals/QuizView/QuizForm';
import SeriesViewerSidebarVideoPanel from 'js/series/seriesviewer/SeriesViewerSidebarVideoPanel';
import FontAwesome from 'react-fontawesome';

const QuizModal = (props) => {
    let quizStyle = (props.showingOverlay ? {} : { display: 'none' });
    let overlayStyle = (props.takingQuiz || props.showingOverlay ? {} : { display: 'none' });

    let nextVideo;
    if (props.nextVideo) {
        nextVideo = (
            <div className="nextVideoBtn">
                <div className="text">
                    Up Next
                </div>
                <SeriesViewerSidebarVideoPanel
                    video={props.nextVideo}
                />
            </div>
        );
    }

    let titleText;
    let greenButton;
    let whiteTextButton;
    if (props.quizTaken) {
        const numCorrect = props.completedQuizInfo.numCorrect;
        const numQuestions = props.completedQuizInfo.result.length;
        titleText = `You answered ${numCorrect} of ${numQuestions} correctly.`;

        greenButton = (
            <Button className="takeQuizButton" onClick={props.reviewQuiz}>
                Review Answers
            </Button>
        );

        whiteTextButton = (
            <div className="noThanks" onClick={props.retakeQuiz}>
                Retake Quiz
            </div>
        );
    } else {
        titleText = 'Would You Like to Check Your Understanding?';

        greenButton = (
            <Button className="takeQuizButton" onClick={props.showQuiz}>
                Take The Quiz
            </Button>
        );
        // nothanks button. just deleted text till we figure out what to do here
        whiteTextButton = <div className="noThanks" />;
    }

    let quizForm;
    if (props.takingQuiz) {
        quizForm = (
            <div className="quizModal">
                <QuizForm
                    videoUUID={props.videoUUID}
                    nextVideo={props.nextVideo}
                    closeModal={props.closeModal}
                    onFinishButton={props.onFinishButton}
                    reviewMode={props.reviewMode}
                    completedQuizInfo={props.completedQuizInfo}
                    resultsPage={props.resultsPage}
                    questions={props.questions}
                    showReviewMode={props.reviewQuiz}
                    onRetakeQuiz={props.retakeQuiz}
                    submitQuizAnswers={props.submitQuizAnswers}
                    showResultsPage={props.showQuizResultsPage}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="greyBackground" style={overlayStyle} />
            <div className="greyBackground" style={quizStyle}>
                <div className="questionText">
                    {titleText}
                </div>
                {greenButton}
                {whiteTextButton}
                <div className="rewatch" onClick={props.playVideo}>
                    <FontAwesome className="undoIcon" name="undo" />
                    <div className="text">
                        Replay video
                    </div>
                </div>
                {nextVideo}
            </div>
            {quizForm}
        </div>
    );
};

QuizModal.propTypes = {
    showingOverlay: PropTypes.bool.isRequired,
    takingQuiz: PropTypes.bool.isRequired,
    quizTaken: PropTypes.bool.isRequired,
    nextVideo: PropTypes.object.isRequired,
    completedQuizInfo: PropTypes.shape({
        numCorrect: PropTypes.number.isRequired,
        result: PropTypes.array.isRequired,
    }).isRequired,
    reviewQuiz: PropTypes.func.isRequired,
    retakeQuiz: PropTypes.func.isRequired,
    showQuiz: PropTypes.func.isRequired,
    playVideo: PropTypes.func.isRequired,

    videoUUID: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
    reviewMode: PropTypes.bool.isRequired,
    showQuizResultsPage: PropTypes.bool.isRequired,
    resultsPage: PropTypes.bool.isRequired,
    onFinishButton: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    submitQuizAnswers: PropTypes.func.isRequired,
};

export default QuizModal;
