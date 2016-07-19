require('bootstrap-loader');
require("css/globals/base.scss")
require("css/registration/popup.scss")

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');

var RegistrationComplete = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar active="registrationComplete"/>
                <div className = "popup">You have been sent a confirmation email</div>
            </div>
        )
    }
})

ReactDOM.render(<RegistrationComplete/>, document.getElementById('page-anchor'))