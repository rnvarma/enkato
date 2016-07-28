require('bootstrap-loader');
require("css/globals/NavBar.scss")
require("css/globals/base.scss")
require("css/home/creator/EducatorOnboarding")

import React, { Component } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Col';

import ProfileSeriesList from 'js/userprofile/profile/ProfileSeriesList';
import CreateSeriesArea from 'js/userdashboard/UserDashboard/CreateSeriesArea.jsx';
import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler.js';
import request from 'js/globals/HttpRequest';

class EducatorOnboarding extends Component {
    render() {
        return (
            <div className="onboardingPage">
                <Row>
                    <Col md={12} sm={12}>
                        <div className="enkatoImageWrapper">
                            <img 
                                src={DjangoImageLinkHandler("enkato_logo.png")}
                                className="enkatoImage" />
                        </div>
                    </Col>
                </Row>
                <Row className="onboardingPageRow">
                    <Col md={6} sm={12}>
                        <div className="titleText">
                            Enhance Your Content on Enkato
                        </div>
                        <div className="descriptiveText">
                            There's more to education than videos. Asking Questions,
                            quizzing, discussion, and efficiency: these are all things
                            lost on other platforms. Enhance your education on a platform
                            that was actually built for education.
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="imageWrapper">
                            <img 
                                className="images"
                                src={DjangoImageLinkHandler("educatorPage/copyLink.JPG")} />
                        </div>
                    </Col>
                </Row>
                <Row className="onboardingPageRow">
                    <Col md={6} sm={12}>
                        <div className="imageWrapper">
                            <img 
                                className="images"
                                src={DjangoImageLinkHandler("educatorPage/AnnotationModal.JPG")} />
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="titleText">
                            Index Your Videos by Topic
                        </div>
                        <div className="descriptiveText">
                            With out friendly interface, you can index your videos
                            by topic easily. Not only this this make reviewing material
                            more efficient for your students, but it creates a
                            table-of-contents for your video, allowing interactions
                            to be tied to topics.
                        </div>
                    </Col>
                </Row>
                <Row className="onboardingPageRow">
                    <Col md={6} sm={12}>
                        <div className="titleText">
                            Create Quizzes for your videos
                        </div>
                        <div className="descriptiveText">
                            Give your students the ability to test their knowledge
                            with mutliple-choice quizzes. After each quiz, students
                            can take quizzes and examine how well they learned.
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="imageWrapper">
                            <img 
                                className="images"
                                src={DjangoImageLinkHandler("educatorPage/quizMaking.JPG")} />
                        </div>
                    </Col>
                </Row>
                <Row className="onboardingPageRow">
                    <Col md={6} sm={12}>
                        <div className="imageWrapper">
                            <img 
                                className="images"
                                src={DjangoImageLinkHandler("educatorPage/QASectionSeriesPage.JPG")} />
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="titleText">
                            Answer Questions, not Comments
                        </div>
                        <div className="descriptiveText">
                            Other platforms were made for entertainment, not education.
                            As a result, questions get mixed with clutter in the
                            unorganized comments section. On Enkato, you can answer
                            questions and create discussion within the context of 
                            your videos.
                        </div>
                    </Col>
                </Row>
                <Row className="onboardingPageRow">
                    <Col md={6} sm={12}>
                        <div className="titleText">
                            Tighten up your skills
                        </div>
                        <div className="descriptiveText">
                            Since enkato was built for education, we prioritize
                            metrics that will benefit the quality of education.
                            We provide you with detailed analytics on which videos
                            were the most effective in teaching subject matter, 
                            which videos caused the most confusion, which parts
                            of each video were the most popular, drop off time,
                            and student demographic. 
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="imageWrapper">
                            <img 
                                className="images"
                                src={DjangoImageLinkHandler("educatorPage/copyLink.JPG")} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

module.exports = EducatorOnboarding;