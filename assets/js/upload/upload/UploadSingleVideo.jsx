require('bootstrap-loader');
require("css/globals/NavBar.scss")

require("css/upload/upload/UploadSingleVideo.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var getCookie = require('js/globals/GetCookie')
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;


var UploadSingleVideo = React.createClass({
    onFormSubmit: function(data) {

    },
    render: function() {
        return (
            <div className="uploadSingleVideo">
                <NavBar />
                <Row>
                    <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
                        Upload
                    </Col>
                </Row>
            </div>
        )
    }
})

ReactDOM.render(<UploadSingleVideo />, document.getElementById('page-anchor'))