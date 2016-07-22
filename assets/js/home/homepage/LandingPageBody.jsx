require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require('css/home/homepage/HomePage')

var React = require('react')
var getCookie = require('js/globals/GetCookie.js')
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

var DjangoImageLinkHandler = require('js/globals/DjangoImageLinkHandler')

module.exports = React.createClass({
    onFormSubmit: function(data) {
        $.ajax({
          url: "/interesteduser",
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            console.log(data);
            if (data.status) {
                window.location.href = "/";
            } else {
                alert(data.issue)
            }
          }.bind(this),
          error: function(xhr, status, err) {
            alert(err.toString())
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            name: '',
            email: '',
        }
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    onEmailChange: function(e) {
        this.setState({email: e.target.value})
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.onFormSubmit(this.state);
    },
    render: function() {
        var headerStyle = {
            backgroundImage: "url(" + DjangoImageLinkHandler("splash_page.png") + ")"
        }
        var katoGirlStyle = {
            backgroundImage: "url(" + DjangoImageLinkHandler("katogirl.png") + ")"
        }
        return (
            <div>
                <div className="header" style={headerStyle}>
                    <Row>
                        <Col md={6} sm={12} className="left">
                            <div className="logo">
                                Education starts with you.
                            </div>
                            <div className="sub-logo">
                                Our mission is to optimize the educational environment in which video-based learning occurs
                            </div>
                        </Col>
                        <Col md={6} sm={12} className="right">
                            <div className="signUpTitle">
                                <span className="bold">Sign up</span> for our free beta!
                            </div>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup controlId="name">
                                    <FormControl onChange={this.onNameChange} type="text" placeholder="Your Name" />
                                </FormGroup>
                                <FormGroup controlId="email">
                                    <FormControl onChange={this.onEmailChange} type="text" placeholder="Email" />
                                </FormGroup>

                                <FormGroup>
                                    <Button className="greenBtn" type="submit">
                                        Submit
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </div>
                <div className="studentBenefits">
                    <Row>
                        <Col md={6}>
                            <div className="left">
                                <div className="text">
                                    <div className="bold">Learn anything,</div> from anyone.
                                </div>
                                <div className="imageArea">
                                    <img src={DjangoImageLinkHandler("iKato.png")} />
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
                <div className="katoGirl" style={katoGirlStyle}>
                    <Row>
                        <Col sm={8} smOffset={2} xs={12} md={6} mdOffset={6}>
                            <div className="content">
                                <div className="title">
                                    Becoming an <span className="bold">enkato educator</span> is easy.
                                </div>
                                <div className="text">
                                    Organize educational videos in public or private classrooms, collaborate with teaching assistants to address questions, analyze student interaction, and create custom quizzes.
                                </div>
                                <Button className="button greenBtn">
                                    Become an Educator
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
})

