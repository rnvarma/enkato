require('css/globals/QuizView/QuizNav.scss');

import React from 'react';
import QuizNavNode from 'js/globals/QuizView/QuizNavNode';

class QuizNav extends React.Component {
    render() {
        var quizNavNodes = this.props.questions.map(function(q, i) {
            return (
                <QuizNavNode
                    key={q.id}
                    q={q}
                    order={i}/>
            )
        })
        return (
            <div className="quizNav">
                {quizNavNodes}
            </div>
        );
    }
}

export default QuizNav;
