require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require('css/home/homepage/HomePage')

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var Footer = require('js/globals/Footer');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var FontAwesome = require('react-fontawesome');

var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var ControlLabel = require('react-bootstrap').ControlLabel;
var InputGroup = require('react-bootstrap').InputGroup;

var LandingPageBody = require("js/home/homepage/LandingPageBody.jsx")
var UserDashboard = require('js/userdashboard/UserDashboard/UserDashboard.jsx')

var HomePage = React.createClass({
    getInitialState: function() {
        return {
            logged_in: false,
            data_recieved:false
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
                data_recieved:true
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        var HomepageBody = "";
        if(this.state.data_recieved){
            if(this.state.logged_in){
                HomepageBody=<UserDashboard />
            } else {
                HomepageBody=<LandingPageBody />
            }
        }

        return (
            <div className="homePage">
                <NavBar />
                {HomepageBody}
                <Footer />
            </div>
        )
    }
})

ReactDOM.render(<HomePage />, document.getElementById('page-anchor'))