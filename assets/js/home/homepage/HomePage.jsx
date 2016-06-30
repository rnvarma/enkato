require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require('css/home/homepage/HomePage')

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var Footer = require('js/globals/Footer');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;

var HomePage = React.createClass({
    render: function() {
        return (
            <div className="homePage">
                <NavBar />
                <div className="header">
                    <div className="left">
                        <div className="logo">
                            Education starts with you.
                        </div>
                        <div className="sub-logo">
                            Our mission is to optimze the educational environment in which video-based learning occurs
                        </div>
                    </div>
                    <div className="right">
                        <div className="signUpTitle">
                            <span className="bold">Sign up</span> (its free!)
                        </div>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup controlId="first-name">
                                <FormControl onChange={this.onFirstNameChange} type="text" placeholder="First Name" />
                            </FormGroup>
                            <FormGroup controlId="last-name">
                                <FormControl onChange={this.onLastNameChange} type="text" placeholder="Last Name" />
                            </FormGroup>
                            <FormGroup controlId="user-name">
                                <FormControl onChange={this.onUserNameChange} type="text" placeholder="User Name" />
                            </FormGroup>
                            <FormGroup controlId="email">
                                <FormControl onChange={this.onEmailChange} type="text" placeholder="Email" />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <FormControl onChange={this.onPasswordChange} type="password" placeholder="Password" />
                            </FormGroup>

                            <FormGroup>
                                <Button className="greenBtn" type="submit">
                                    Start Learning Today
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div className="studentBenefits">
                    <Row>
                        <Col md={6}>
                            <div className="left">
                                <div className="text">
                                    <div className="bold">Learn anything,</div> from anyone.
                                </div>
                                <div className="imageArea">
                                    <img src="/static/imgs/iKato.png" />
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="right">
                                <div className="info">
                                    <div className="icon">
                                        <FontAwesome name="users" />
                                    </div>
                                    <div className="textArea">
                                        <div className="title">
                                            Your questions, answered.
                                        </div>
                                        <div className="text">
                                            Ask questions right when you have them and learn from previously asked questions.
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="icon">
                                        <FontAwesome name="tv" />
                                    </div>
                                    <div className="textArea">
                                        <div className="title">
                                            Your topics, skipped.
                                        </div>
                                        <div className="text">
                                            Quickly navigate through different topics within videos.
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="icon">
                                        <FontAwesome name="line-chart" />
                                    </div>
                                    <div className="textArea">
                                        <div className="title">
                                            Your progress, tracked.
                                        </div>
                                        <div className="text">
                                            Join classrooms, interact with eduacators and teaching assistants, and track your progress!
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="icon">
                                        <FontAwesome name="leaf" />
                                    </div>
                                    <div className="textArea">
                                        <div className="title">
                                            Your understanding, checked.
                                        </div>
                                        <div className="text">
                                            Diagnostic quizzes help your check your understanding.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="katoGirl">
                    <Row>
                        <Col sm={8} smOffset={2} xs={12} md={6} mdOffset={6}>
                            <div className="content">
                                <div className="title">
                                    Becoming a <span className="bold">enkato educator</span> is easy.
                                </div>
                                <div className="text">
                                    Organize educational videos in public or private classrooms, collaborate with teaching assistants to address questions, analyze student interaction, and create custom quizzes.
                                </div>
                                <Button className="button greenBtn">
                                    Become on Educator
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }
})

ReactDOM.render(<HomePage />, document.getElementById('page-anchor'))