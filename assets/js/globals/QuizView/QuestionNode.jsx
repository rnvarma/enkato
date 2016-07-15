require('bootstrap-loader');
var React = require('react');
require("css/globals/QuizView/QuestionNode");
var ChoiceList = require('js/globals/QuizView/ChoiceList')
var FontAwesome = require('react-fontawesome');


module.exports = React.createClass({
    render:function(){
        return(
            <div className="questionNode">
                <div className="title"> 
                    <FontAwesome
                    className='arrowIcon' 
                    name='arrow-right'/>
                    <span className="titleText">
                        {this.props.question.quizQuestionText} 
                    </span>
                </div>
                <ChoiceList 
                    className="choiceList"
                    choiceList={this.props.question.choiceList}
                />
            </div>
        )
    }
})