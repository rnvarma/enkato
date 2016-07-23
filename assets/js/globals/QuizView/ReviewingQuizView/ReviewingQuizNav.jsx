require('bootstrap-loader');
var React = require('react');
require('css/globals/QuizView/QuizNav.scss');

import QuizNavNode from 'js/globals/QuizView/QuizNavNode';

module.exports = React.createClass({
    render:function(){
        var quizNavNodes = this.props.questions.map(function(q, i) {
            var correct = this.props.quizResults[i].isCorrect
            return (
                <QuizNavNode
                    key={q.id}
                    q={q}
                    index={i}
                    order={i + 1}
                    active={this.props.currentQuestion == i}
                    setQuestion={this.props.setQuestion}
                    reviewMode={true}
                    correct={correct}/>
            )
        }.bind(this))
        return (
            <div className="quizNav">
                {quizNavNodes}
            </div>
        );
    }
})