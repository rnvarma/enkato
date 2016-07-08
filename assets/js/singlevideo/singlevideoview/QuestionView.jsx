require('css/singlevideo/singlevideoview/QuestionView.scss');

import React from 'react';

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
      addingQuestion: false,
    };
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.pushQuestion = this.pushQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestionData();
  }

  getQuestionData() {
    $.ajax({
      url: `/api/video/${this.props.videoUUID}/questions`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({
          questions: data.questions,
          currentQuestion: data.questions[0],
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

  setFilter(filter) {
    this.setState({
      filter,
    });
  }

  closeModal() {
    this.setState({
      addingQuestion: false,
    });
  }

  /* prompts user to add question, via modal in QuestionForm */
  addQuestion() {
    this.setState({
      addingQuestion: true,
    });
  }

  /* adds question to state */
  pushQuestion(newQuestion) {
    this.setState({
      questions: [...this.state.questions, newQuestion],
      currentQuestion: newQuestion,
    });
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
            setFilter={this.setFilter}
          />
        </Row>
        <Row className="questionView">
          <QuestionList
            questions={this.state.questions}
            currentQuestion={this.state.currentQuestion}
            setCurrentQuestion={this.setCurrentQuestion}
          />
          <QuestionDisplay question={this.state.currentQuestion} />
        </Row>
      </Row>
    );
  }
}

export default QuestionView;