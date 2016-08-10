import React, { Component, PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import request from 'js/globals/HttpRequest';
import QuestionForm from 'js/globals/QuestionAndAnswer/QuestionForm';

export default class QuestionModal extends Component {
    static propTypes = {
        showing: PropTypes.bool.isRequired,
        topicList: PropTypes.array.isRequired,
        videoUUID: PropTypes.string.isRequired,
        askQuestionText: PropTypes.string.isRequired,
        getCurrentTime: PropTypes.func,
        pushQuestion: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
    }

    state = {
        topic: null,
        title: this.props.askQuestionText,
        text: '',
        generalError: '',
        titleError: '',
        textError: '',
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.askQuestionText,
        });

        if (!this.props.showing && nextProps.showing) {
            this.questionTime = this.props.getCurrentTime();

            if (!this.state.topic) { /* auto-select topic */
                const topicsBeforeTime = this.props.topicList.filter((topic) => {
                    return topic.time < this.questionTime;
                });
                if (topicsBeforeTime.length > 0) {
                    this.setState({
                        topic: topicsBeforeTime[topicsBeforeTime.length - 1].real_id,
                    });
                }
            }
        }
    }

    onTopicChange = (e) => {
        this.setState({ topic: e.target.value });
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    onTextChange = (e) => {
        this.setState({ text: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.postQuestion();
    }

    attachFile = (e) => {
        console.log('FILE', e.target.files[0]);
    }

    postQuestion = () => {
        if (this.state.title && this.state.text) {
            const payload = {
                video_uuid: this.props.videoUUID,
                title: this.state.title,
                text: this.state.text,
                time: this.questionTime,
                topic_pk: this.state.topic,
            };
            request.post('/1/questions', {
                data: payload,
                success: (newQuestion) => {
                    this.props.pushQuestion(newQuestion);
                    this.props.close();
                    this.setState({
                        title: '',
                        text: '',
                        topic: '',
                    });
                },
            });
        }
    }


    close = () => {
        this.setState({
            text: '',
            title: '',
            topic: null,
        });
        this.props.close();
    }

    render() {
        return (
            <div className="questionModal">
                <Modal show={this.props.showing} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ask a Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <QuestionForm
                            topicList={this.props.topicList}
                            onSubmit={this.onSubmit}
                            onTopicChange={this.onTopicChange}
                            onTitleChange={this.onTitleChange}
                            onTextChange={this.onTextChange}
                            titleValue={this.state.title}
                            textValue={this.state.text}
                            topicValue={this.state.topic}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <FormControl className="pull-left" type="file" onChange={this.attachFile} />*/}
                        <Button className="btn-secondary" onClick={this.close}>Cancel</Button>
                        <Button className="btn-primary" onClick={this.postQuestion}>Publish</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
