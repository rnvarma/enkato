require("css/globals/NavBar.scss")

var React = require('react')
var moment = require('moment')

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

var CreateSeriesModal = require('js/globals/CreateSeriesModal')
var DjangoImageLinkHandler = require('js/globals/DjangoImageLinkHandler')
var FontAwesome = require('react-fontawesome');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            logged_in: false,
            username: '',
            user_id: 0,
            num_notifications: 0,
            notifications: []
        }
    },
    componentWillMount: function() {
        $.ajax({
          url: "/1/userdata",
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({
                logged_in: data.logged_in,
                username: data.username,
                user_id: data.user_id
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        $.ajax({
          url: "/1/getnotificationsnum",
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({
                num_notifications: data.num
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        $.ajax({
          url: "/1/getnotifications",
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({
                notifications: data.notifications
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        var active = this.props.active;
        var LoginButton = active == "login" ? (
          <NavItem eventKey={1} className="active" href="/login">SIGN IN</NavItem>
        ) : (
          <NavItem eventKey={1} href="/login">SIGN IN</NavItem>
        )
        var RegisterButton = active == "register" ? (
          <NavItem eventKey={2} className="active" href="/register">SIGN UP</NavItem>
        ) : (
          <NavItem eventKey={2} href="/register">SIGN UP</NavItem>
        )
        if (this.state.logged_in) {
            var numstring = this.state.num_notifications
            var RightBar = (
                <Nav pullRight>
                    <CreateSeriesModal />
                    <NavItem eventKey={2} href="/logout">Logout</NavItem>
                    <NavItem eventKey={1} href="/userprofile">{this.state.username}</NavItem>
                    <FontAwesome name="fa fa-bell" aria-hidden="true"></FontAwesome>
                    <NavDropdown eventKey={3} title={numstring} id="basic-nav-dropdown">
                        {this.state.notifications.map(function(notification) {
                            return (<MenuItem href={notification.link}><div className = "notification">{notification.description} {moment(notification.timestamp).format('LLL')}</div></MenuItem>);
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
            <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">
                        <span className="logo"><img className="headerLogo" src={DjangoImageLinkHandler("enkato_logo.png")} /></span>
                    </a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  {RightBar}
                </Navbar.Collapse>

            </Navbar>
        )
    }
})