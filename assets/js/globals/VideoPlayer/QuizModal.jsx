require('bootstrap-loader');
var React = require('react')
require("css/globals/VideoPlayer/QuizModal")


module.exports= React.createClass({
    render:function(){
        var style = (this.props.showingQuiz ? {} : {display:"none"})
        return(
            <div 
                className="greyBackground"
                style={style}
            >
                <div 
                    className="quizModal"
                    style={style}
                >
                    Hello World
                </div>
            </div>
        )
    }
})