require("css/globals/CreateSeriesModal.scss")

var React = require('react')

var NavItem = require('react-bootstrap').NavItem;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

var CreateSeriesForm = require('js/globals/CreateSeriesForm')
var getCookie = require('js/globals/GetCookie')

module.exports = React.createClass({
    getInitialState() {
        return {
            showModal: false,
            name: "",
            description: "",
        }
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value})
    },
    onFormSubmit: function() {
        if (!this.state.name || !this.state.description) return;
        data = {
            name: this.state.name,
            description: this.state.description
        }
        $.ajax({
          url: "/createseries",
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
                window.location.href = "/s/" + data.s_uuid;
            } else {
                console.log("sad face");
            }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    close: function() {
        this.setState({showModal: false})
    },
    open: function() {
        this.setState({showModal: true})
    },
    render: function() {
        return (
            <li className="createSeriesModal">
                <Button className="createBtn" eventKey={3} onClick={this.open}>Create</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create a New Series</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateSeriesForm
                        onNameChange={this.onNameChange}
                        onDescriptionChange={this.onDescriptionChange}/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.onFormSubmit}>Create</Button>
                  </Modal.Footer>
                </Modal>
            </li>
        )
    }
})