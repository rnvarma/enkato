
require("css/series/seriespage/NoVideosArea.scss");

var React = require('react')

var getCookie = require('js/globals/GetCookie');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var AddVideoToSeriesForm = require('js/series/seriespage/AddVideoToSeriesForm');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            showModal: false,
            urls: ""
        }
    },
    close: function() {
        this.setState({showModal: false})
    },
    open: function() {
        this.setState({showModal: true})
    },
    onURLAdded: function(e) {
        this.setState({urls: e.target.value});
    },
    onFormSubmit: function(e) {
        if (!this.state.urls) return;
        data = {
            urls: this.state.urls
        }
        $.ajax({
          url: "/upload/s/" + this.props.data.s_id,
          dataType: 'json',
          type: 'POST',
          data: data,
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          success: function(data) {
            console.log(data);
            if (data.status) {
                this.close()
                this.props.reloadPageData()
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="noVideosArea">
                <div>This series is currently empty.</div>
                <div className="addVideo">
                    <Button onClick={this.open} className="addVideoBtn structabl-blue">Import Video(s)</Button>
                    <Modal show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                        <Modal.Title>Import Video(s)</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <AddVideoToSeriesForm 
                            onURLAdded={this.onURLAdded}/>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="structabl-blue" onClick={this.close}>Cancel</Button>
                        <Button className="structabl-red">Back</Button>
                        <Button className="structabl-red" onClick={this.onFormSubmit}>Next</Button>
                      </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
})
