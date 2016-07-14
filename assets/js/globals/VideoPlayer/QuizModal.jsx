require('bootstrap-loader');
var React = require('react');
require("css/globals/VideoPlayer/QuizModal");
import Button from 'react-bootstrap/lib/Button';

var QuizForm = require('js/globals/VideoPlayer/QuizForm');

module.exports= React.createClass({
    render:function(){
        var bg_style = (this.props.showingOverlay ? {} : {display:"none"})
        var q_style = (this.props.takingQuiz ? {} : {display:"none"})
        return(
            <div>
                <div 
                    className="greyBackground"
                    style={bg_style}
                >
                    <div className="questionText">
                        Would You Like to Check Your Understanding?
                    </div>
                    <Button 
                        className="takeQuizButton"
                        onClick={this.props.showQuiz}
                    >
                        Take The Quiz
                    </Button>
                    <div className="noThanks">
                        No, Thanks
                    </div>
                </div>
                <div 
                    className="quizModal"
                    style={q_style}
                >
                    <QuizForm />
                </div>
            </div>
        )
    }
})