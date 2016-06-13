require('bootstrap-loader');
require("css/globals/base.scss")

var React = require('react')
var ReactDOM = require('react-dom')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var NavBar = require('js/globals/NavBar');
var RegistrationForm = require('js/authentication/register/RegistrationForm');

var Register = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar active="register"/>
                <Row>
                    <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                        <RegistrationForm />
                    </Col>
                </Row>
            </div>
        )
    }
})

ReactDOM.render(<Register />, document.getElementById('page-anchor'))