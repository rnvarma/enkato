require('bootstrap-loader');
require("css/main.scss");

import React, { Component, cloneElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import NavBar from 'js/globals/NavBar';
import HomePage from 'js/home/homepage/HomePage';
import RegisterModal from "js/globals/RegisterModal";
import LoginModal from 'js/globals/LoginModal';
import SignUpModal from 'js/globals/SignUpModal';

import auth from 'auth';

function helloWorld(){
    console.log("hello worlddddddddddddddddddddd")
}


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            registerModalCallBackFn:helloWorld,
            registerModalOpen:false,
            loggedIn:auth.loggedIn(),
            loginModalOpen: false,
            signUpModalOpen: false,
        }

        this.openRegisterModal = this.openRegisterModal.bind(this)
        this.closeRegisterModal = this.closeRegisterModal.bind(this)
        this.setLoggedIn = this.setLoggedIn.bind(this)
        this.closeLoginModal = this.closeLoginModal.bind(this)
        this.openLoginModal = this.openLoginModal.bind(this)
        this.closeSignUpModal = this.closeSignUpModal.bind(this)
        this.openSignUpModal = this.openSignUpModal.bind(this)
    }

    openRegisterModal(callBackFn) {
        this.setState({
            registerModalCallBackFn:callBackFn,
            registerModalOpen:true,
        })
    }

    closeRegisterModal() {
        this.setState({
            registerModalOpen:false
        })
    }

    setLoggedIn(loggedIn) {
        this.setState({
            loggedIn:loggedIn
        })
    }

    openLoginModal(){
        this.setState({
            loginModalOpen: true
        })
    }

    closeLoginModal(){
        this.setState({
            loginModalOpen:false,
        })
    }

    openSignUpModal(){
        this.setState({
            signUpModalOpen:true,
        })
    }

    closeSignUpModal(){
        this.setState({
            signUpModalOpen:false,
        })
    }

    render() {
        return (
            <div>
                <NavBar 
                    loggedIn={this.state.loggedIn} 
                    openLoginModal={this.openLoginModal}
                    openSignUpModal={this.openSignUpModal}/>
                <RegisterModal 
                    closeRegisterModal={this.closeRegisterModal} 
                    setLoggedIn={this.setLoggedIn}
                    registerModalOpen={this.state.registerModalOpen}
                    callbackFn={this.state.registerModalCallBackFn}/>
                <LoginModal 
                    loginModalOpen={this.state.loginModalOpen}
                    closeLoginModal={this.closeLoginModal}
                    navBarItem = {true}/>
                <SignUpModal 
                    signUpModalOpen={this.state.signUpModalOpen}
                    closeSignUpModal={this.closeSignUpModal}
                    navBarItem = {true}/>
                <div className="contentArea">
                    {(this.props.children && cloneElement(this.props.children, {
                        openRegisterModal: this.openRegisterModal,
                        loggedIn: this.state.loggedIn,
                    })) || <HomePage loggedIn={this.state.loggedIn}/>}
                </div>
            </div>
        )
    }
}

const rootRoute = {
    childRoutes: [ {
        path: "/",
        component: App,
        indexRoute: HomePage,
        childRoutes: [
            require('js/authentication/login/routes'),
            require('js/authentication/register/routes'),
            require('js/series/seriesviewer/routes'),
            require('js/series/seriespage/routes'),
            require('js/userprofile/profile/routes'),
            require('js/singlevideo/singlevideoview/routes'),
            require('js/home/creator/routes'),
        ]
    } ]    
}

render((
    <Router
        history={browserHistory}
        routes={rootRoute}/>
), document.getElementById('page-anchor'))