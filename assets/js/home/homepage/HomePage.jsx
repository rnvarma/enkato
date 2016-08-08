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
            logged_in: auth.loggedIn()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            logged_in: nextProps.loggedIn
        });
    }

    render() {
        var HomepageBody = "";
        console.log(this.state.logged_in)
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