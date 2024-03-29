import React, { Component, PropTypes } from 'react';

import Fuse from 'fuse.js';
import FontAwesome from 'react-fontawesome';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import { Typeahead } from 'react-typeahead';

import request from 'js/globals/HttpRequest';
import auth from 'auth';
import QuestionModal from 'js/globals/QuestionAndAnswer/QuestionModal';
import QuestionFilterBar from 'js/globals/QuestionAndAnswer/QuestionFilterBar';
import QuestionList from 'js/globals/QuestionAndAnswer/QuestionList';
import QuestionDisplay from 'js/globals/QuestionAndAnswer/QuestionDisplay';

export default class QuestionView extends Component {
    static propTypes = {
        videoUUID: PropTypes.string,
        topicList: PropTypes.array.isRequired,
        getCurrentTime: PropTypes.func,
        loadQuestionData: PropTypes.func,
        openRegisterModal: PropTypes.func.isRequired,
        passQuestions: PropTypes.func,
        currentQuestion: PropTypes.object,
        embed: PropTypes.bool,
    }

    state = {
        questions: [],
        filteredQuestions: [],
        currentQuestion: null,
        filter: '',
        filterAnswered: false,
        filterUnanswered: false,
        filterTopic: null,
        addingQuestion: false,
        askQuestionText: '',
        topicList: this.props.topicList,
    };

    componentDidMount() {
        this.getQuestionData(this.props.videoUUID);
        this.loadUserData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.videoUUID !== nextProps.videoUUID) {
            this.getQuestionData(nextProps.videoUUID);
        }

        if (this.props.currentQuestion !== nextProps.currentQuestion) {
            this.setCurrentQuestion(nextProps.currentQuestion, true);
        } else if (this.props.currentQuestion) { /* make sure this isn't initial load */
            this.scrollToQuestionArea();
        }

        if (this.props.topicList !== nextProps.topicList) {
            this.setState({
                topicList: nextProps.topicList,
            });
        }
    }

    onTopicChange = (e) => {
        let topicId = parseInt(e.target.value, 10);
        if (isNaN(topicId)) {
            topicId = null;
        }
        this.setFilter(this.state.filter, false, topicId);
    }

    onQuestionFilterSelect = (questionTitle) => {
        const question = this.filterQuestionByTitle(questionTitle);
        this.setCurrentQuestion(question, true);
    }

    onAskQuestionChange = (e) => {
        if (e.key === 'Enter') {
            this.addQuestion();
        } else {
            this.setState({
                askQuestionText: e.target.value,
            });
        }
    }

    getQuestionData = (videoUUID) => {
        if (!videoUUID && !this.props.loadQuestionData) return;
        const onSuccess = (data) => {
            this.processQuestionData(data);

            this.setState({
                questions: this.questionData,
                filteredQuestions: this.questionData,
                currentQuestion: this.questionData[0],
            });
            if (this.props.passQuestions) {
                this.props.passQuestions(this.questionData);
            }
        };
        if (this.props.loadQuestionData) {
            this.props.loadQuestionData(onSuccess);
            return;
        }
        request.get(`/1/questions?video_uuid=${videoUUID}`, {
            success: onSuccess,
        }, this.props.embed);
    }

    setCurrentQuestion = (question, scroll = false) => {
        if (scroll) {
            this.setState({
                currentQuestion: question,
            }, this.scrollToQuestionArea);
        } else {
            this.setState({
                currentQuestion: question,
            });
        }
    }

    setFilter = (filter, reset = false, filterTopic = null) => {
        if (reset) {
            this.setState({
                filter,
                filterAnswered: false,
                filterUnanswered: false,
                filterTopic: null,
            }, this.filterQuestions);
        } else {
            this.setState({ filter, filterTopic }, this.filterQuestions);
        }
    }

    getQuestion = questionId =>
        this.questionData.find(question => questionId === question.id);

    getResponse = (questionId, responseId) =>
        this.getQuestion(questionId).responses.find(response => responseId === response.id);

    /* prompts user to add question, via modal in QuestionForm */
    addQuestion = () => {
        if (auth.loggedIn()) {
            this.setState({
                addingQuestion: true,
            });
        } else {
            this.props.openRegisterModal(() => {
                this.setState({
                    addingQuestion: true,
                });
            });
        }
    }

    /* adds question to state */
    pushQuestion = (newQuestion) => {
        newQuestion.input = {
            title: newQuestion.title,
            text: newQuestion.text,
            topic: newQuestion.topic,
        };
        this.questionData = [...this.questionData, newQuestion];

        const newState = {
            questions: this.questionData,
            currentQuestion: newQuestion,
        };

        const index = this.state.topicList.findIndex(topic => topic.real_id === newQuestion.topic_pk);
        if (index !== -1) {
            const topicToChange = Object.assign({}, this.state.topicList[index]);
            topicToChange.question_count += 1;
            newState.topicList = [...this.state.topicList.slice(0, index), topicToChange, ...this.state.topicList.slice(index + 1)];
        }

        this.setState(newState, this.filterQuestions);

        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    closeModal = () => {
        this.setState({ addingQuestion: false });
    }

    filterQuestions = () => {
        /* first remove based on whether the question is answered or not */
        let filteredQuestions = this.questionData.filter((question) => {
            let valid = true;

            if (this.state.filterAnswered) {
                valid = question.resolved;
            }
            if (this.state.filterUnanswered) {
                valid = valid && !question.resolved;
            }
            if (this.state.filterTopic !== null) {
                if (this.state.filterTopic === 0) { /* general topic */
                    valid = valid && question.topic === null;
                } else { /* on of the specific ones */
                    valid = valid && question.topic !== null && question.topic.id === this.state.filterTopic;
                }
            }

            return valid;
        });

        /* now do fuzzy search */
        /* https://github.com/krisk/Fuse#options */
        if (this.state.filter) {
            const fuse = new Fuse(filteredQuestions, {
                keys: ['title', 'text', 'responses.text'],
            /* verbose: true, very useful for debugging */
            });
            filteredQuestions = fuse.search(this.state.filter);
        }
        this.setState({ filteredQuestions });
    }

    toggleAnsweredFilter = () => {
        this.setState({
            filterAnswered: !this.state.filterAnswered,
            filterUnanswered: false,
        }, this.filterQuestions);
    }

    toggleUnansweredFilter = () => {
        this.setState({
            filterAnswered: false,
            filterUnanswered: !this.state.filterUnanswered,
        }, this.filterQuestions);
    }

    removeQuestion = (questionId) => {
        const question = this.getQuestion(questionId);
        const index = this.questionData.indexOf(question);
        this.questionData.splice(index, 1);

        const newState = {
            question: this.questionData,
            currentQuestion: this.questionData[0] || null,
        };

        const topicIndex = this.state.topicList.findIndex(topic => topic.real_id === question.topic_pk);
        if (topicIndex !== -1) {
            const topicToChange = Object.assign({}, this.state.topicList[topicIndex]);
            topicToChange.question_count -= 1;
            newState.topicList = [...this.state.topicList.slice(0, topicIndex), topicToChange, ...this.state.topicList.slice(topicIndex + 1)];
        }

        this.setState(newState, this.filterQuestions);

        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    processQuestionData = (data) => {
        /* add data to support persistent editing and other shit */
        this.questionData = data;
        this.questionData.forEach((question, index, array) => {
            question.responses.forEach((response, i, arr) => {
                response.input = response.text;
                arr[i] = response;
            });
            question.input = {
                title: question.title,
                text: question.text,
                topic: question.topic_pk,
            };
            if (question.topic) {
                question.input.topic = question.topic.id;
            }
            array[index] = question;
        });
    }

    pushQuestionEditText = (questionId, questionEditTopic, questionEditTitle, questionEditText) => {
        const question = this.getQuestion(questionId);
        question.input = {
            topic: questionEditTopic,
            title: questionEditTitle,
            text: questionEditText,
        };
        this.setState({ question: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    pushQuestionNewText = (questionId, questionNewTopic, questionNewTitle, questionNewText) => {
        const question = this.getQuestion(questionId);
        question.title = questionNewTitle;
        question.text = questionNewText;
        question.input = {
            topic: questionNewTopic,
            title: questionNewTitle,
            text: questionNewText,
        };

        this.setState({
            question: this.questionData,
        });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    pushResponse = (questionId, newResponse) => {
        const questionToAppend = this.getQuestion(questionId);
        if (newResponse.is_instructor) {
            questionToAppend.resolved = true;
        }
        newResponse.input = newResponse.text;
        questionToAppend.responses.push(newResponse);
        this.setState({ questions: this.questionData }, this.filterQuestions);
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    /* stores to response input, unique for each question */
    pushResponseText = (questionId, responseText) => {
        const question = this.getQuestion(questionId);
        question.responseInput = responseText;
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    /* similar to above, but for the case in which you are editing responses */
    /* does not update actual response.text, internal */
    pushResponseEditText = (questionId, responseId, responseEditText) => {
        const response = this.getResponse(questionId, responseId);
        response.input = responseEditText;
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    pushResponseNewText = (questionId, responseId, newText) => {
        const response = this.getResponse(questionId, responseId);
        response.text = newText;
        response.input = response.text;
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    removeResponse = (questionId, responseId) => {
        const question = this.getQuestion(questionId);
        const response = this.getResponse(questionId, responseId);
        const index = question.responses.indexOf(response);
        question.responses.splice(index, 1);
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    toggleEndorsedResponse = (questionId, responseId) => {
        const question = this.getQuestion(questionId);
        const response = question.responses.find(r => responseId === r.id);
        response.endorsed = !response.endorsed;
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    toggleEditQuestion = questionId => {
        const question = this.getQuestion(questionId);
        if (question.editing) { /*  checks if it's undefined */
            question.editing = false;
        } else {
            question.editing = true;
        }
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    toggleEditResponse = (questionId, responseId) => {
        const question = this.getQuestion(questionId);
        const response = question.responses.find(r => responseId === r.id);
        if (response.editing) {
            response.editing = false;
        } else {
            response.editing = true;
        }
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    replaceQuestion = (questionId, newQuestion) => {
        const question = this.getQuestion(questionId);

        const newState = {};

        const oldTopicIndex = this.state.topicList.findIndex(topic => topic.real_id === question.topic_pk);
        const topicIndex = this.state.topicList.findIndex(topic => topic.real_id === newQuestion.topic_pk);
        if (oldTopicIndex !== topicIndex) {
            let arrayToSlice;
            if (oldTopicIndex !== -1) {
                const oldTopic = Object.assign({}, this.state.topicList[oldTopicIndex]);
                oldTopic.question_count -= 1;

                newState.topicList = [...this.state.topicList.slice(0, oldTopicIndex), oldTopic, ...this.state.topicList.slice(oldTopicIndex + 1)];
                arrayToSlice = newState.topicList;
            } else {
                arrayToSlice = this.state.topicList;
            }
            if (topicIndex !== -1) {
                const topicToChange = Object.assign({}, arrayToSlice[topicIndex]);
                topicToChange.question_count += 1;
                newState.topicList = [...arrayToSlice.slice(0, topicIndex), topicToChange, ...arrayToSlice.slice(topicIndex + 1)];
            }
        }

        $.extend(question, newQuestion);
        newState.questions = this.questionData;

        this.setState(newState, this.filterQuestions);
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    replaceResponse = (questionId, responseId, newResponse) => {
        const response = this.getResponse(questionId, responseId);
        $.extend(response, newResponse);
        this.setState({ questions: this.questionData });
        if (this.props.passQuestions) {
            this.props.passQuestions(this.questionData);
        }
    }

    /* query user data for validation purposes */
    loadUserData = () => {
        if (auth.loggedIn()) {
            request.get('/1/users/current', {
                success: (data) => {
                    this.currentUser = data;
                },
            }, this.props.embed);
        }
    }

    filterQuestionByTitle = (title) => {
        const results = this.state.questions.filter(q => q.title === title);
        if (!results) return null;
        return results[0];
    }

    scrollToQuestionArea = () => {
        this.setState({
            filterTopic: null,
        }, this.filterQuestions);
        const $questionArea = $('.questionArea');
        const top = $questionArea.offset().top;
        const distance = Math.abs($(window).scrollTop() - top);
        const offset = this.props.embed ? 50 : 0;
        $('html, body').animate({ scrollTop: top - offset }, Math.min(Math.max(distance, 250), 500), () => {
            const $questionList = $questionArea.find('.questionList');
            const distanceToScroll = $questionList.children('.selected').offset().top - $questionList.offset().top;
            $questionList.animate({ scrollTop: $questionList.scrollTop() + distanceToScroll }, Math.min(Math.abs(distanceToScroll) * 2, 500));
        });
    }

    makeQuestionFromFilter = () => {
        this.setState({
            askQuestionText: this.state.filter,
        }, this.addQuestion);
    }

    render() {
        let askModal;
        let askQuestionBar;
        if (this.props.videoUUID) {
            askModal = (
                <QuestionModal
                    topicList={this.props.topicList}
                    getCurrentTime={this.props.getCurrentTime}
                    videoUUID={this.props.videoUUID}
                    showing={this.state.addingQuestion}
                    close={this.closeModal}
                    pushQuestion={this.pushQuestion}
                    askQuestionText={this.state.askQuestionText}
                    embed={this.props.embed}
                />
            );
            const questionOptions = this.state.questions.map(q => q.title);
            askQuestionBar = (
                <div className="askQuestionBar">
                    <Typeahead
                        placeholder="Don't understand something? Ask a question here."
                        options={questionOptions}
                        onOptionSelected={this.onQuestionFilterSelect}
                        onKeyUp={this.onAskQuestionChange}
                        customClasses={{ input: 'typeahead-input' }}
                    />
                    <Button className="addQuestionBtn" onClick={this.addQuestion}>
                        <FontAwesome name="plus-circle addQuestionIcon" />
                        Ask A Question
                    </Button>
                </div>
            );
        }

        return (
            <div className="questionView">
                {askQuestionBar}
                <Row>
                    {askModal}
                    <Row>
                        <Col md={12}>
                            <div className="qaTitle headline">Question & Answer</div>
                        </Col>
                    </Row>
                    <div className="titledContainer">
                        <QuestionFilterBar
                            questionCount={this.state.questions.length}
                            showingSeries={!this.props.videoUUID}
                            filter={this.state.filter}
                            filterAnswered={this.state.filterAnswered}
                            filterUnanswered={this.state.filterUnanswered}
                            filterTopic={this.state.filterTopic}
                            topicList={this.state.topicList}
                            onTopicChange={this.onTopicChange}
                            setFilter={this.setFilter}
                            toggleAnsweredFilter={this.toggleAnsweredFilter}
                            toggleUnansweredFilter={this.toggleUnansweredFilter}
                            makeQuestionFromFilter={this.makeQuestionFromFilter}
                            embed={this.props.embed}
                        />
                        <Row className="qaContent">
                            <QuestionList
                                showingSeries={!this.props.videoUUID}
                                questions={this.state.filteredQuestions}
                                currentQuestion={this.state.currentQuestion}
                                setCurrentQuestion={this.setCurrentQuestion}
                            />
                            <QuestionDisplay
                                openRegisterModal={this.props.openRegisterModal}
                                showingSeries={!this.props.videoUUID}
                                topicList={this.props.topicList}
                                getCurrentTime={this.props.getCurrentTime}
                                question={this.state.currentQuestion}
                                removeQuestion={this.removeQuestion}
                                pushQuestionEditText={this.pushQuestionEditText}
                                pushQuestionNewText={this.pushQuestionNewText}
                                pushResponse={this.pushResponse}
                                pushResponseText={this.pushResponseText}
                                pushResponseEditText={this.pushResponseEditText}
                                pushResponseNewText={this.pushResponseNewText}
                                removeResponse={this.removeResponse}
                                toggleEndorsedResponse={this.toggleEndorsedResponse}
                                toggleEditQuestion={this.toggleEditQuestion}
                                toggleEditResponse={this.toggleEditResponse}
                                replaceQuestion={this.replaceQuestion}
                                replaceResponse={this.replaceResponse}
                                videoUUID={this.props.videoUUID}
                                currentUser={this.currentUser}
                                embed={this.props.embed}
                            />
                        </Row>
                    </div>
                </Row>
            </div>
        );
    }
}
