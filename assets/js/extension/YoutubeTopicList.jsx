import React, { Component, PropTypes } from 'react';

import ScrollArea from 'react-scrollbar';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';

import TakeQuizButton from 'js/globals/videoPlayer/TakeQuizButton';
import ScrollingOverflow from 'js/globals/ScrollingOverflow';
import TopicQuestion from 'js/extension/TopicQuestion';

function resizeTopicList() {
    var windowHeight = $(window).height();
    var topicListHeight = windowHeight - 171;
    $(".topicList").height(topicListHeight);
    $(".faqList").height(topicListHeight);
}

class TopicNode extends Component {
    static propTypes = {
        topic: PropTypes.object.isRequired,
        showingQuiz: PropTypes.bool,
        selectQuestion: PropTypes.func.isRequired,
    }

    state = {
        showQuestions: false,
    }

    componentDidMount() {
        resizeTopicList();
        window.onresize = resizeTopicList;
    }

    onToggleQuestions = () => {
        this.setState({
            showQuestions: !this.state.showQuestions,
        });
    }

    render() {
        const { topic } = this.props;
        let questions;
        let questionToggle;
        const hasQuestions = topic.questions && topic.questions.length > 0;
        if (hasQuestions) {
            questions = topic.questions.map(question => (
                <TopicQuestion
                    key={question.id}
                    question={question}
                    selectQuestion={this.props.selectQuestion}
                />
            ));
            questionToggle = (
                <span className="questionToggle">
                    <Button className="btn-secondary btn btn-default" onClick={this.onToggleQuestions}>Q</Button>
                    <Collapse in={this.state.showQuestions}>
                        <div>{questions}</div>
                    </Collapse>
                </span>
            );
        }
        return (
            <div className="topicNodeAndQuestions">
                <div
                    className="topicNode"
                    id={((topic.isCurrentTopic && !this.props.showingQuiz) ? 'selectedTopicNode' : '')}
                >
                    <a href={`javascript: yt.www.watch.player.seekTo(${topic.time});`}>
                        <div className="time">
                            {topic.time_clean}
                        </div>
                        <div className="name">
                            <ScrollingOverflow
                                text={topic.name}
                                elementSize={'50%'}
                            />
                        </div>
                    </a>
                </div>
                {questionToggle}
            </div>
        );
    }
}

export default class TopicList extends React.Component {
    render() {
        const topicNodes = this.props.topicObjList.map((topic) => {
            return (
                <TopicNode
                    key={topic.id}
                    topic={topic}
                    selectQuestion={this.props.selectQuestion}
                />
            );
        }, this);

        return (
            <ScrollArea className="topicList">
                {topicNodes}
            </ScrollArea>
        );
    }
}
