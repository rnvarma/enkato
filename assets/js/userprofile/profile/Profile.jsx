require('bootstrap-loader');
require("css/globals/NavBar.scss")

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var UpdateUserInfoForm = require('js/userprofile/profile_forms/UpdateUserInfoForm');


var Profile = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <Row>
                    <Col md={8} sm={10} xs={12}>
                        <UpdateUserInfoForm />
                    </Col>
                </Row>
            </div>
        )
    }
});





ReactDOM.render(<Profile />, document.getElementById('page-anchor'))