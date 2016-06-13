require('bootstrap-loader');
require("css/globals/NavBar.scss")

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var HomePage = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <Row>
                    <Col md={8} sm={10} xs={12}></Col>
                </Row>
            </div>
        )
    }
})

ReactDOM.render(<HomePage />, document.getElementById('page-anchor'))