import React, { Component, PropTypes } from 'react';

import Quiz from 'js/globals/QuizView/Quiz';

export default class YouTubeQuiz extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    state = {
        displayQuiz: true,
        hasQuizResults: false, /* should be set by props */
    }

    componentDidMount() {
        $('video').on('ended', () => {
            this.setState({
                displayQuiz: true,
            });
        });
    }

    componentWillUnmount() {
        $('video').off('ended');
    }

    render() {
        if (this.props.questions) {
            console.log('qs', this.props.questions);
            return (
                <div className="youtubeQuiz">
                    <Quiz
                        questions={this.props.questions}
                    />
                </div>
            );
        }

        return <div>loading quiz questions</div>;
    }
}
