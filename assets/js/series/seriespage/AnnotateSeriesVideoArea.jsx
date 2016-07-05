
require("css/series/seriespage/AnnotateSeriesVideoArea.scss");

var React = require('react')
var EditVideoPlayer = require('js/globals/EditVideoPlayer/EditVideoPlayer');
var QuizAddingForm = require('js/globals/QuizAddingForm/QuizAddingForm');

module.exports = React.createClass({
    render: function() {
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
})