import React, { Component, PropTypes } from 'react';

import Quiz from 'js/globals/QuizView/Quiz';

export default class YouTubeQuiz extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(PropTypes.object).isRequired,
        quizResponses: PropTypes.arrayOf(PropTypes.object),
        quizCorrect: PropTypes.number,
    }

    state = {
        displayingQuiz: false,
    }

    componentDidMount() {
        $('video').on('ended', () => {
            this.setState({
                displayingQuiz: true,
            });
        });
    }

    componentWillUnmount() {
        $('video').off('ended');
    }

    toggleQuiz = () => {
        this.setState({
            displayingQuiz: !this.state.displayingQuiz,
        });
    }

    render() {
        if (this.props.questions) {
            console.log('qs', this.props.questions);
            return (
                <div className="youtubeQuiz">
                    <button onClick={this.toggleQuiz}>open quiz</button>
                    <Quiz
                        videoUUID={this.props.videoUUID}
                        questions={this.props.questions}
                        displayingQuiz={this.state.displayingQuiz}
                        closeQuiz={this.toggleQuiz}
                        quizResponses={this.props.quizResponses}
                        quizCorrect={this.props.quizCorrect}
                        embed
                    />
                </div>
            );
        }

        return <div>loading quiz questions</div>;
    }
}
