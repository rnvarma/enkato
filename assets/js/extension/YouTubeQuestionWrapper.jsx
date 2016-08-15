import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import RegisterModal from 'js/globals/RegisterModal';
import YouTubeTopicList from 'js/extension/YouTubeTopicList';
import QuestionView from 'js/globals/QuestionAndAnswer/QuestionView';

export default class YouTubeQuestionWrapper extends Component {
    static propTypes = {
        videoUUID: PropTypes.string.isRequired,
        topicList: PropTypes.array.isRequired,
    }

    state = {
        registerOpen: false,
        registerCallback: function empty() { },
        topicListOpen: false,
        topicListWithQuestions: this.props.topicList, /* initial value */
        generalTopicQuestions: [],
    }

    onToggle = () => {
        const isOpen = this.state.topicListOpen;
        this.setState({
            topicListOpen: !isOpen,
        });
        if (isOpen) {
            $('#topicWrapper').removeClass('active');
            $(body).removeClass('topiclist-active');
        } else {
            $('#topicWrapper').addClass('active');
            $(body).addClass('topiclist-active');
        }
    }

    passQuestions = (_questions) => {
        const questions = Object.assign([], _questions);
        const general = [];
        const newTopicList = this.state.topicListWithQuestions.map(t => {
            const topic = Object.assign({}, t);
            topic.questions = [];
            for (let i = questions.length - 1; i >= 0; i--) {
                if (topic.real_id === questions[i].topic_pk) {
                    topic.questions.push(questions[i]);
                    questions.splice(i, 1);
                } else if (questions[i].topic_pk === null) {
                    general.push(questions[i]);
                    questions.splice(i, 1);
                }
            }
            return topic;
        });
        this.setState({
            topicListWithQuestions: newTopicList,
            generalTopicQuestions: general,
        });
    }

    openRegister = (callback) => {
        this.setState({
            registerOpen: true,
            registerCallback: callback,
        });
    }

    closeRegister = () => {
        this.setState({
            registerOpen: false,
        });
    }

    render() {
        const toggle = this.state.topicListOpen ? <FontAwesome name="close" /> : 'Open Topics';
        return (
            <div className="youtubeWrapper">
                <div id="topicWrapper" className="youtubeTopicsWrapper">
                    <div className="openCloseBtn" onClick={this.onToggle}>{toggle}</div>
                    <Tabs defaultActiveKey={1} animation={false}>
                        <Tab eventKey={1} title="Topics">
                            <YouTubeTopicList topicObjList={this.state.topicListWithQuestions} />
                        </Tab>
                        <Tab eventKey={2} title="FAQ">
                            lol, send this.state.generalTopicQuestions here
                        </Tab>
                    </Tabs>
                </div>
                <RegisterModal
                    registerModalOpen={this.state.registerOpen}
                    closeRegisterModal={this.closeRegister}
                    callbackFn={this.state.registerCallback}
                    embed
                />
                <QuestionView
                    videoUUID={this.props.videoUUID}
                    topicList={this.props.topicList}
                    openRegisterModal={this.openRegister}
                    passQuestions={this.passQuestions}
                    embed
                />
            </div>
        );
    }
}
