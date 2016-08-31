import React, { Component, PropTypes } from 'react';

import Quiz from 'js/globals/QuizView/Quiz';
import RegisterModal from 'js/globals/RegisterModal';
import auth from 'auth';

export default class YouTubeQuiz extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(PropTypes.object).isRequired,
        quizResponses: PropTypes.arrayOf(PropTypes.object),
        quizCorrect: PropTypes.number,
    }

    state = {
        displayingQuiz: false,
        displayingRegister: false,
        registerCallback: function empty() { },
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
        if (!this.state.displayingQuiz) {
            this.openQuiz();
        } else {
            this.setState({
                displayingQuiz: false,
            });
        }
    }

    // checks auth before opening
    openQuiz = () => {
        if (auth.loggedIn()) {
            this.setState({
                displayingQuiz: true,
            });
        } else {
            this.setState({
                displayingRegister: true,
                registerCallback: () => {
                    this.setState({
                        displayingQuiz: true,
                    });
                },
            });
        }
    }

    closeRegisterModal = () => this.setState({
        displayingRegister: false,
    });

    render() {
        if (this.props.questions) {
            return (
                <div className="youtubeQuiz" style={{ height: 0 }}>
                    <RegisterModal
                        registerModalOpen={this.state.displayingRegister}
                        closeRegisterModal={this.closeRegisterModal}
                        callbackFn={this.state.registerCallback}
                        embed
                    />
                    <Quiz
                        videoUUID={this.props.videoUUID}
                        questions={this.props.questions}
                        displayingQuiz={this.state.displayingQuiz}
                        closeQuiz={this.toggleQuiz}
                        initialShowingSplash={this.props.quizResponses && this.props.quizResponses.length > 0}
                        quizResponses={this.props.quizResponses}
                        quizCorrect={this.props.quizCorrect}
                        embed
                    />
                </div>
            );
        }

        return <span>loading quiz questions</span>;
    }
}
