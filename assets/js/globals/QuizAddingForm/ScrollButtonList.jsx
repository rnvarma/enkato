
require("css/globals/QuizAddingForm/ScrollButtonList.scss");

var React = require('react')

var ScrollButtonNode = require('js/globals/QuizAddingForm/ScrollButtonNode');

module.exports = React.createClass({
    render:function(){
        var ScrollButtonNodes = this.props.questions.map(function(question, index) {
            return (
                <ScrollButtonNode
                    id={question.id}
                    scrollToFromButton={this.props.scrollToFromButton}
                    key={question.id}
                    index={index}
                    active={question.active}
                    order={index + 1}/>
            )
        }.bind(this))
        return(
            <div>
                {ScrollButtonNodes}
            </div>
        )
    }
})
