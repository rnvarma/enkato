require('css/globals/QuizAddingForm/ScrollButtonList.scss');

import React, { Component } from 'react';

import ScrollButtonNode from 'js/globals/QuizAddingForm/ScrollButtonNode';

class ScrollButtonList extends Component {
    render() {
        const ScrollButtonNodes = this.props.questions.map((question, index) => {
            return (
                <ScrollButtonNode
                    key={question.id}
                    questionId={question.id}
                    active={question.active}
                    scrollToQuestion={this.props.scrollToFromButton}
                    index={index}
                    order={index + 1}/>
            );
        });

        return (
            <div>
                {ScrollButtonNodes}
            </div>
        );
    }
}

export default ScrollButtonList;
