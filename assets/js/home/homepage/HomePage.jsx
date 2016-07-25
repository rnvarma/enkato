require('bootstrap-loader');
require("css/globals/base.scss")
require('css/globals/NavBar.scss')
require('css/home/homepage/HomePage')

import React, { Component } from 'react'

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import FontAwesome from 'react-fontawesome'

import Footer from 'js/globals/Footer';
import LandingPageBody from 'js/home/homepage/LandingPageBody.jsx';
import UserDashboard from 'js/userdashboard/UserDashboard/UserDashboard.jsx';
import auth from 'auth';
import request from 'js/globals/HttpRequest';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: false
        }
    }

    componentWillMount() {
        if (!auth.loggedIn()) return;
        request.get('/1/userdata', {
            success: function(data) {
                this.setState({
                    logged_in: data.logged_in
                });
            }.bind(this),
        })
    }

    render() {
        var HomepageBody = "";

        if(this.state.logged_in){
            HomepageBody=<UserDashboard />
        } else {
            HomepageBody=<LandingPageBody />
        }

        return (
            <div className="homePage">
                {HomepageBody}
                <Footer />
            </div>
        )
    }
}

export default HomePage;