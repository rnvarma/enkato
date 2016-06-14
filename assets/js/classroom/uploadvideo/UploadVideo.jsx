require('bootstrap-loader');
require("css/globals/base.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var CLIENT_ID = '78e14b9e222b5734b48cd41dbb1025e27a32bc22'
var CLIENT_SECRETS = 'YF5rK/gxOY4E2nn9jx8lTLMQ1fdL5gcvPwRNHU7tv7scROZDNkx7gsrGDQWVxEwv3p0xfc7x03b7FwCDuMs1E+iN987S58pgHL7ZAXqWMx/WUdY4EBSIK44LnAsblhfE'
var ACCESS_TOKEN = '04c0b8d723068e0ad96ea488b533f0e9'

var Vimeo = require('vimeo').Vimeo;
var v_lib = new Vimeo(CLIENT_ID, CLIENT_SECRETS, ACCESS_TOKEN);

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var NavBar = require('js/globals/NavBar');
var UploadVideoForm = require('js/classroom/uploadvideo/UploadVideoForm')

var UploadVideo = React.createClass({
    onFormSubmit: function(data) {
        v_lib.streamingUpload(data.video_url, function(error, body, status_code, headers) {
            if (error) {
                throw error;
            }
            console.log("upload complete!");
            console.log(body)
        }, function(upload_size, file_size) {
            var percent = Math.round(upload_size / file_size * 100) / 100;
            console.log("uploaded: " + percent + "%")
        })
    },
    render: function() {
        return (
            <Row>
                <NavBar />
                <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">Upload a Video</h1>
                    <UploadVideoForm onFormSubmit={this.onFormSubmit} />
                </Col>
            </Row>
        )
    }
})

ReactDOM.render(<UploadVideo />, document.getElementById('page-anchor'))