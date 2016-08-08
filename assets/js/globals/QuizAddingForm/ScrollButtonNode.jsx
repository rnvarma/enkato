import React, { Component } from 'react';

class ScrollButtonNode extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.scrollToQuestion(this.props.questionId, this.props.index);
    }

    render() {
        return (
            <div 
                onClick={this.onClick}
                className={'singleNumberButton' + (this.props.active ? ' active' : '')}>
                {this.props.order}
            </div>
        );
    }
}

export default ScrollButtonNode;
