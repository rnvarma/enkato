require('bootstrap-loader');
require("css/globals/VideoPlayer/Video")
var React = require('react')
var QuizModal = require('js/globals/VideoPlayer/QuizModal')
import { Button, Modal } from 'react-bootstrap';


module.exports = React.createClass({ 
    render:function(){
        var height = this.props.videoDivHeight - this.props.controlBarHeight;
        return (
            <div 
                style={{height:height+"px"}}
                className="iframeWrapper">
                {this.props.renderVideo()}
                <QuizModal showingQuiz={this.props.showingQuiz}/>
            </div>
        )
    }
});