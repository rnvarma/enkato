import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import QuestionForm from 'js/globals/QuestionAndAnswer/QuestionForm';
import request from 'js/globals/HttpRequest';

class QuestionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: null,
            title: this.props.askQuestionText,
            text: '',
            generalError: '',
            titleError: '',
            textError: '',
        };

        this.attachFile = this.attachFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.postQuestion = this.postQuestion.bind(this);
        this.onTopicChange = this.onTopicChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
    }

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

    attachFile(event) {
        console.log("FILE", event.target.files[0]);
    }

    onSubmit(event) {
        event.preventDefault();
        this.postQuestion();
    }

    postQuestion() {
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
            })
        }
    }

    onTopicChange(event) {
        this.setState({ topic: event.target.value });
    }

    onTitleChange(event) {
        // TODO: validation
        this.setState({ title: event.target.value });
    }

    onTextChange(event) {
        // TODO: validation
        this.setState({ text: event.target.value });
    }

    close() {
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
                            topicValue={this.state.topic}/>
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<FormControl className="pull-left" type="file" onChange={this.attachFile} />*/}
                        <Button onClick={this.close}>Cancel</Button>
                        <Button onClick={this.postQuestion}>Publish</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default QuestionModal;
