import React, { Component, PropTypes } from 'react';

/**
 * displays a scroll button node
 */
export default class ScrollButtonNode extends Component {
    static propTypes = {
        questionId: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        active: PropTypes.bool,
        order: PropTypes.number.isRequired,
        scrollToQuestion: PropTypes.func.isRequired,
    }
    /**
     * handles a click
     */
    onClick = () => {
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
