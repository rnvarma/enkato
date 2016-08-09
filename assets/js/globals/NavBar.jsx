import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

import CreateSeriesModal from 'js/globals/CreateSeriesModal';
import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler';
import request from 'js/globals/HttpRequest';
import auth from 'auth';
import Dotdotdot from 'react-dotdotdot';


class NavBar extends Component {
    constructor(props) {
        super(props)

        console.log(this.props);

        this.state = {
            logged_in: false,
            username: '',
            user_id: 0,
            num_notifications: 0,
            notifications: [],
        }

        this.getOnClick = this.getOnClick.bind(this)
        this.getNotifications = this.getNotifications.bind(this)
        this.markAsRead = this.markAsRead.bind(this)
        this.logout = this.logout.bind(this)
        this.loadDataFromServer = this.loadDataFromServer.bind(this)
    }

    logout() {
        auth.logout(() => {
            window.location.href = "/"
        })
    }

    componentWillMount() {
        this.loadDataFromServer()
    }

    loadDataFromServer() {
        this.getNotifications();
        if (!auth.loggedIn()) return;
        request.get('/1/userdata', {
            success: function(data) {
                this.setState({
                    logged_in: data.logged_in,
                    username: data.username,
                    user_id: data.user_id
                });
            }.bind(this)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadDataFromServer()
    }

    getNotifications() {
        request.get('/1/getnotifications', {
            success: function(data) {
                this.setState({
                    notifications: data.notifications,
                    num_notifications: data.num
                });
            }.bind(this),
        })
    }

    markAsRead(notification) {
        var ids = notification.ids;
        console.log(ids);
        request.post('/1/markasread', {
            data: {
                ids: notification.ids,
            }
        })
    }

    getOnClick(notification) {
        if (!notification.link) {
            return () => {}
        }
        return () => {
            this.markAsRead(notification);
            window.location.href = notification.link;
        }
    }

    render() {
        var active = this.props.active;
        var LoginButton = (
            <li role="presentation" onClick= {this.props.openLoginModal}>
                Login
            </li>
        )

        var RegisterButton = (
            <li role="presentation" onClick ={this.props.openSignUpModal}>
                Sign Up
            </li>
        )
        if (this.state.logged_in) {
            var numstring = this.state.num_notifications
            var RightBar = (
                <Nav pullRight>
                    <NavItem eventKey={2} onClick={this.logout}>Logout</NavItem>
                    <li role="presentation">
                        <Link to="/userprofile" activeClassName="active">{this.state.username}</Link>
                    </li>
                    <NavDropdown eventKey={3} title={numstring} id="basic-nav-dropdown">
                        {this.state.notifications.map((notification, index) => {
                            if (notification.timestamp != "") {
                                var timestring = moment(notification.timestamp).fromNow();
                            } else {
                                var timestring = ""
                            }
                            return (<MenuItem key={index} onClick={this.getOnClick(notification)}><div className = "notification"><Dotdotdot clamp = {1}>{notification.description}</Dotdotdot>{timestring}</div></MenuItem>);
                        })}
                    </NavDropdown>
                </Nav>
            )
        } else {
            var RightBar = (
                <Nav pullRight>
                    {RegisterButton}
                    {LoginButton}
                </Nav>
            )
        }
        return(
            <Navbar fixedTop>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">
                        <span className="logo"><img className="headerLogo" src={DjangoImageLinkHandler("enkato_logo.png")} /></span>
                    </Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  {RightBar}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;