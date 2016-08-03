require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require('css/home/homepage/HomePage')

import React, { Component } from 'react'

import FontAwesome from 'react-fontawesome'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { Link } from 'react-router';
import InputGroup from 'react-bootstrap/lib/InputGroup';

import request from 'js/globals/HttpRequest';
import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';
import ProfileSeriesList from 'js/userprofile/profile/ProfileSeriesList';

class LandingPageBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            curated_series: [],
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this)
    }

    componentDidMount() {
        request.get('/1/curatedseries', {
            success: (data) => {
                this.setState(data)
            }
        })
    }

    onFormSubmit(e) {
        e.preventDefault()
        var data = this.state;

        request.post('/interesteduser', {
            data: data,
            success: (data) => {
                if (data.status) {
                    window.location.href = "/";
                } else {
                    alert(data.issue)
                }
            }
        })
    }

    onNameChange(e) {
        this.setState({name: e.target.value})
    }

    onEmailChange(e) {
        this.setState({email: e.target.value})
    }

    render() {
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
                                 Our mission is to unlock the full potential of online learning.
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="curatedContent">
                    <div className="title">
                    </div>
                    <ProfileSeriesList
                        name="Explore these curated series"
                        series={this.state.curated_series} />
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
                                            Get your questions answered.
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
                                            Easily skip through topics.
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
                                            Track your progress.
                                        </div>
                                        <div className="text">
                                            Join classrooms, interact with educators and teaching assistants, and track your progress!
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="icon">
                                        <FontAwesome name="leaf" />
                                    </div>
                                    <div className="textArea">
                                        <div className="title">
                                            Check your understanding.
                                        </div>
                                        <div className="text">
                                            Diagnostic quizzes and post-assessments help you check your understanding.
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
                                    Becoming an <span className="bold">Enkato educator</span> is easy.
                                </div>
                                <div className="text">
                                    Organize and enhance your online content, and interact directly with your students to provide a better learning experience.
                                </div>
                                <Link to="/educator">
                                    <Button className="button greenBtn">
                                        Become an Educator
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default LandingPageBody;