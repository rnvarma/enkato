require("css/globals/NavBar.scss")

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
import FontAwesome from 'react-fontawesome';
import request from 'js/globals/HttpRequest';
import auth from 'auth'

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            logged_in: false,
            username: '',
            user_id: 0,
            num_notifications: 0,
            notifications: []
        }

        this.getNotifications = this.getNotifications.bind(this)
        this.markAsRead = this.markAsRead.bind(this)
        this.dropdownToggle = this.dropdownToggle.bind(this)
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

    markAsRead() {
        if (this.state.num_notifications > 0) {
            var timestamp = this.state.notifications[0].timestamp;
            request.post('/1/markasread', {
                data: {
                    timestamp: timestamp
                }
            })
        }
    }

    dropdownToggle(isOpen) {
        if (isOpen) {
          this.markAsRead();
        }
    }

    render() {
        var active = this.props.active;
        var LoginButton = (
            <li role="presentation">
                <Link to="/login" activeClassName="active">Sign In</Link>
            </li>
        )
        var RegisterButton = (
            <li role="presentation">
                <Link to="/register" activeClassName="active">Sign Up</Link>
            </li>
        )
        if (this.state.logged_in) {
            var numstring = this.state.num_notifications
            var RightBar = (
                <Nav pullRight>
                    <CreateSeriesModal />
                    <NavItem eventKey={2} onClick={this.logout}>Logout</NavItem>
                    <li role="presentation">
                        <Link to="/userprofile" activeClassName="active">{this.state.username}</Link>
                    </li>
                    <NavDropdown eventKey={3} title={numstring} id="basic-nav-dropdown" onToggle = {this.dropdownToggle}>
                        {this.state.notifications.map(function(notification) {
                            if (notification.timestamp != "") {
                                var timestring = moment(notification.timestamp).fromNow();
                            }
                            else {
                                var timestring = ""
                            }
                            return (<MenuItem href={notification.link}><div className = "notification">{notification.description} {timestring}</div></MenuItem>);
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