import React, { Component, PropTypes } from 'react';

class ScrollButtonNode extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.scrollToQuestion(this.props.questionId, this.props.index);
    }

    render() {
        return (
            <div
                onClick={this.onClick}
                className={`singleNumberButton ${this.props.active ? ' active' : ''}`}
            >
                {this.props.order}
            </div>
        );
    }
}

ScrollButtonNode.propTypes = {
    questionId: PropTypes.number,
    index: PropTypes.number,
    active: PropTypes.bool,
    order: PropTypes.number,
    scrollToQuestion: PropTypes.func,
};

export default ScrollButtonNode;
