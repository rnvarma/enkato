require('css/singlevideo/singlevideoview/QuestionView.scss');

import React from 'react';

import Fuse from 'fuse.js';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import QuestionForm from 'js/singlevideo/singlevideoview/QuestionForm';
import QuestionFilterBar from 'js/singlevideo/singlevideoview/QuestionFilterBar';
import QuestionList from 'js/singlevideo/singlevideoview/QuestionList';
import QuestionDisplay from 'js/singlevideo/singlevideoview/QuestionDisplay';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: null,
      filter: '',
      filterAnswered: false,
      filterUnanswered: false,
      addingQuestion: false,
    };
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.pushQuestion = this.pushQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.pushQuestionEditText = this.pushQuestionEditText.bind(this);
    this.pushQuestionNewText = this.pushQuestionNewText.bind(this);
    this.pushResponse = this.pushResponse.bind(this);
    this.pushResponseText = this.pushResponseText.bind(this);
    this.pushResponseEditText = this.pushResponseEditText.bind(this);
    this.pushResponseNewText = this.pushResponseNewText.bind(this);
    this.removeResponse = this.removeResponse.bind(this);
    this.toggleAnsweredFilter = this.toggleAnsweredFilter.bind(this);
    this.toggleUnansweredFilter = this.toggleUnansweredFilter.bind(this);
  }

  componentDidMount() {
    this.getQuestionData(this.props.videoUUID);
  }

  getQuestionData(videoUUID) {
    $.ajax({
      url: `/api/video/${videoUUID}/questions`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.questionData = data.questions;
        /* set response.input, used for editing responses */
        this.questionData.forEach((question, index, array) => {
          question.responses.forEach((response, i, arr) => {
            response.input = response.text;
            arr[i] = response;
          });
          question.input = {
            title: question.title,
            text: question.text,
          };
          array[index] = question;
        });
        this.setState({
          questions: this.questionData,
          currentQuestion: this.questionData[0],
        });
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      },
    });
  }

  setCurrentQuestion(questionId) {
    this.setState({
      currentQuestion: questionId,
    });
  }

  setFilter(filter, reset = false) {
    if (reset) {
      this.setState({
        filter,
        filterAnswered: false,
        filterUnanswered: false,
      }, this.filterQuestions);
    } else {
      this.setState({ filter }, this.filterQuestions);
    }
  }

  toggleAnsweredFilter() {
    this.setState({
      filterAnswered: !this.state.filterAnswered, filterUnanswered: false
    }, this.filterQuestions);
  }

  toggleUnansweredFilter() {
    this.setState({
      filterAnswered: false, filterUnanswered: !this.state.filterUnanswered
    }, this.filterQuestions);
  }

  filterQuestions() {
    /* first remove based on whether the question is answered or not */
    let questions = this.questionData.filter((question) => {
      let valid = true;

      if (this.state.filterAnswered) {
        valid = question.resolved;
      }
      if (this.state.filterUnanswered) {
        valid = valid && !question.resolved;
      }

      return valid;
    });

    /* now do fuzzy search */
    /* https://github.com/krisk/Fuse#options */
    if (this.state.filter) {
      const fuse = new Fuse(questions, {
        keys: ['title', 'text', 'responses.text'],
        /* verbose: true, very useful for debugging */
      });
      questions = fuse.search(this.state.filter);
    }
    this.setState({ questions });
  }

  closeModal() {
    this.setState({ addingQuestion: false });
  }

  /* prompts user to add question, via modal in QuestionForm */
  addQuestion() {
    this.setState({ addingQuestion: true });
  }

  /* adds question to state */
  pushQuestion(newQuestion) {
    this.questionData = [...this.questionData, newQuestion];
    this.setState({
      questions: this.questionData,
      currentQuestion: newQuestion,
    });
  }

  removeQuestion(questionId) {
    const question = this.questionData.find(question => {
      return questionId == question.id;
    });
    const index = this.questionData.indexOf(question);
    this.questionData.splice(index, 1);
    this.setState({ question: this.questionData });
  }

  pushQuestionEditText(questionId, questionEditTitle, questionEditText) {
    const question = this.questionData.find(question => {
      return questionId == question.id;
    });
    question.input.title = questionEditTitle;
    question.input.text = questionEditText;
    this.setState({ question: this.questionData });
  }

  pushQuestionNewText(questionId, questionNewTitle, questionNewText) {
    const question = this.questionData.find(question => {
      return questionId == question.id;
    });
    question.title = questionNewTitle;
    question.text = questionNewText;
    this.setState({ question: this.questionData });
  }

  /* actually adds the response after it has been POSTed */
  pushResponse(questionId, newResponse) {
    const questionToAppend = this.questionData.find(question => {
      return questionId === question.id;
    });
    questionToAppend.responses.push(newResponse);
    this.setState({ questions: this.questionData });
  }

  /* stores to response input, unique for each question */
  pushResponseText(questionId, responseText) {
    const question = this.questionData.find(question => {
      return questionId === question.id;
    });
    question.responseInput = responseText;
    this.setState({ questions: this.questionData });
  }

  /* similar to above, but for the case in which you are editing responses */
  /* does not update actual response.text, internal */
  pushResponseEditText(questionId, responseId, responseEditText) {
    const question = this.questionData.find(question => {
      return questionId === question.id;
    });
    const response = question.responses.find(response => {
      return responseId === response.id;
    });
    response.input = responseEditText;
    this.setState({ questions: this.questionData });
  }

  pushResponseNewText(questionId, responseId, newText) {
    const question = this.questionData.find(question => {
      return questionId === question.id;
    });
    const response = question.responses.find(response => {
      return responseId === response.id;
    });
    response.text = newText;
    this.setState({ questions: this.questionData });
  }

  removeResponse(questionId, responseId) {
    const question = this.questionData.find(question => {
      return questionId === question.id;
    });
    const response = question.responses.find(response => {
      return responseId === response.id;
    });
    const index = question.responses.indexOf(response);
    question.responses.splice(index, 1);
    this.setState({
      questions: this.questionData,
      currentQuestion: this.questionData[0],
    });
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.videoUUID != nextProps.videoUUID) {
          this.getQuestionData(nextProps.videoUUID);
      }
  }

  render() {
    return (
      <Row>
        <QuestionForm
          videoUUID={this.props.videoUUID}
          showing={this.state.addingQuestion}
          close={this.closeModal}
          pushQuestion={this.pushQuestion}
        />
        <Row>
          <Col md={5}>
            <h2>Question & Answers</h2>
          </Col>
          <Col mdOffset={9}>
            <Button className="addQuestionBtn" onClick={this.addQuestion}>Add A Question</Button>
          </Col>
        </Row>
        <Row>
          <QuestionFilterBar
            filter={this.state.filter}
            filterAnswered={this.state.filterAnswered}
            filterUnanswered={this.state.filterUnanswered}
            setFilter={this.setFilter}
            toggleAnsweredFilter={this.toggleAnsweredFilter}
            toggleUnansweredFilter={this.toggleUnansweredFilter}
          />
        </Row>
        <Row className="questionView">
          <QuestionList
            questions={this.state.questions}
            currentQuestion={this.state.currentQuestion}
            setCurrentQuestion={this.setCurrentQuestion}
          />
          <QuestionDisplay
            question={this.state.currentQuestion}
            removeQuestion={this.removeQuestion}
            pushQuestionEditText={this.pushQuestionEditText}
            pushQuestionNewText={this.pushQuestionNewText}
            pushResponse={this.pushResponse}
            pushResponseText={this.pushResponseText}
            pushResponseEditText={this.pushResponseEditText}
            pushResponseNewText={this.pushResponseNewText}
            removeResponse={this.removeResponse}
            videoUUID={this.props.videoUUID}
          />
        </Row>
      </Row>
    );
  }
}

export default QuestionView;