require('bootstrap-loader');
require("css/globals/base.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var NavBar = require('js/globals/NavBar');

var Classroom = React.createClass({
    render: function() {
        return (
            <Row>
                <NavBar />
                <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">This is a Class!</h1>
                </Col>
            </Row>
        )
    }
})

ReactDOM.render(<Classroom />, document.getElementById('page-anchor'))