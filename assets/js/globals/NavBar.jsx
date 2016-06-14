require("css/globals/NavBar.scss")

var React = require('react')

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var MenuItem = require('react-bootstrap').MenuItem;
var NavDropdown = require('react-bootstrap').NavDropdown;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            logged_in: false,
            username: '',
            user_id: 0
        }
    },
    componentDidMount: function() {
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
    },
    render: function() {
        var active = this.props.active;
        var LoginButton = active == "login" ? (
          <NavItem eventKey={1} className="active" href="/login">Login</NavItem>
        ) : (
          <NavItem eventKey={1} href="/login">Login</NavItem>
        )
        var RegisterButton = active == "register" ? (
          <NavItem eventKey={2} className="active" href="/register">Register</NavItem>
        ) : (
          <NavItem eventKey={2} href="/register">Register</NavItem>
        )
        if (this.state.logged_in) {
            var RightBar = (
                <Nav pullRight>
                    <NavItem eventKey={2} href="/logout">Logout</NavItem>
                    <NavItem eventKey={1} href="/userprofile">{this.state.username}</NavItem>
                </Nav>
            )
        } else {
            var RightBar = (
                <Nav pullRight>
                    {LoginButton}
                    {RegisterButton}
                </Nav>
            )
        }
        return(
            <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">
                        <span className="logo-you">you</span><span className="logo-niversity">niversity</span>
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