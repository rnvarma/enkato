require("css/globals/NavBar.scss")

var React = require('react')

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var MenuItem = require('react-bootstrap').MenuItem;
var NavDropdown = require('react-bootstrap').NavDropdown;

module.exports = React.createClass({
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
      console.log(RegisterButton)
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
                <Nav pullRight>
                  {LoginButton}
                  {RegisterButton}
                </Nav>
              </Navbar.Collapse>

          </Navbar>
        )
    }
})