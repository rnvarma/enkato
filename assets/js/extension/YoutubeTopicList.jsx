import React, { Component, PropTypes } from 'react';

import ScrollArea from 'react-scrollbar';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';

import TakeQuizButton from 'js/globals/videoPlayer/TakeQuizButton';
import ScrollingOverflow from 'js/globals/ScrollingOverflow';

const QuestionNode = ({ question }) => {
    return (
        <div>
            {question.title} - {question.text}
        </div>
    );
};

QuestionNode.propTypes = {
    question: PropTypes.object.isRequired,
};

class TopicNode extends Component {
    static propTypes = {
        topic: PropTypes.object.isRequired,
        showingQuiz: PropTypes.bool,
    }

    state = {
        showQuestions: false,
    }

    onToggleQuestions = () => {
        this.setState({
            showQuestions: !this.state.showQuestions,
        });
    }

    render() {
        const { topic } = this.props;
        let questions;
        if (topic.questions) {
            questions = topic.questions.map(question => <QuestionNode key={question.id} question={question} />);
        }
        return (
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
                            elementSize={"80%"}
                        />
                    </div>
            </a>                    
                    <Button onClick={this.onToggleQuestions}>Questions</Button>
                    <Collapse in={this.state.showQuestions}>
                        <div>{questions}</div>
                    </Collapse>
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
