require('css/globals/QuizView/QuizNavNode.scss');

import React from 'react';

class QuizNavNode extends React.Component {
    render() {
        return (
            <div className="quizNavNode">
                {this.props.order}
            </div>
        );
    }
}

export default QuizNavNode;
