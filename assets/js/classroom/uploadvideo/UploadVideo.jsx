require('bootstrap-loader');
require("css/globals/base.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var NavBar = require('js/globals/NavBar');
var UploadVideoForm = require('js/classroom/uploadvideo/UploadVideoForm')

var UploadVideo = React.createClass({
    render: function() {
        return (
            <Row>
                <NavBar />
                <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">Upload a Video</h1>
                    <UploadVideoForm />
                </Col>
            </Row>
        )
    }
})

ReactDOM.render(<UploadVideo />, document.getElementById('page-anchor'))