require('bootstrap-loader');
var React = require('react');
require("css/globals/VideoPlayer/QuizModal");
import Button from 'react-bootstrap/lib/Button';

var QuizForm = require('js/globals/QuizView/QuizForm');
import SerivesViewerSidebarVideoPanel from 'js/series/seriesviewer/SerivesViewerSidebarVideoPanel';

module.exports= React.createClass({
    
    render:function(){
        var bg_style = (this.props.showingOverlay ? {} : {display:"none"})
        var q_style = (this.props.takingQuiz ? {} : {display:"none"})
        var nextVideo;
        if (this.props.nextVideo) {
            nextVideo = (
                <div className="nextVideoBtn">
                    <div className="text">
                        Up Next
                    </div>
                    <SerivesViewerSidebarVideoPanel
                        video={this.props.nextVideo} />
                </div>
            )
        }
        return(
            <div>
                <div className="greyBackground" style={bg_style}>
                    <div className="questionText">
                        Would You Like to Check Your Understanding?
                    </div>
                    <Button className="takeQuizButton" onClick={this.props.showQuiz}>
                        Take The Quiz
                    </Button>
                    <div className="noThanks">
                        No, Thanks
                    </div>
                    {nextVideo}
                </div>
                <div className="quizModal" style={q_style}>
                    <QuizForm
                        videoUUID={this.props.videoUUID}
                        closeModal={this.props.closeModal}/>
                </div>
            </div>
        )
    }
})