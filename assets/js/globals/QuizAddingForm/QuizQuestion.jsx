
require("css/globals/QuizAddingForm/QuizQuestion.scss");

var React = require('react')
var Row = require('react-bootstrap').Row;
var FontAwesome = require('react-fontawesome');

module.exports = React.createClass({
    handleQuestionTextChange: function(e){
        this.props.handleQuizQuestionChange(e.target.value)
    },
    render: function(){
        return(
            <Row className="question-row">
                <FontAwesome
                    className='arrow-icon' 
                    name='arrow-right'/>
                <input
                    className="question-input"
                    type="text"
                    placeholder="Question"
                    value={this.props.questionText}
                    onChange={this.handleQuestionTextChange}
                    onFocus={this.props.scrollToQuestion}/>
                <FontAwesome
                    className="timesIcon"
                    name="times"/>
            </Row>
        )
    }
})