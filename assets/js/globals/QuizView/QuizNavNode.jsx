import React, { PropTypes } from 'react';

class QuizNavNode extends React.Component {
    constructor(props) {
        super(props);

        this.onClicked = this.onClicked.bind(this);
    }

    onClicked() {
        this.props.setQuestion(this.props.index);
    }

    render() {
        let className = 'quizNavNode';
        className += this.props.active ? ' active' : '';
        className += this.props.reviewMode ? ' review' : '';
        className += this.props.correct ? ' correct' : '';
        return (
            <div
                className={className}
                onClick={this.onClicked}
            >
                {this.props.order}
            </div>
        );
    }
}

QuizNavNode.propTypes = {
    setQuestion: PropTypes.func,
    active: PropTypes.bool,
    reviewMode: PropTypes.bool,
    correct: PropTypes.bool,
    index: PropTypes.number,
    order: PropTypes.number,
};

export default QuizNavNode;
