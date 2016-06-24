require("css/globals/CreateSeriesModal.scss")

var React = require('react')

var NavItem = require('react-bootstrap').NavItem;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

var CreateSeriesForm = require('js/globals/CreateSeriesForm')

module.exports = React.createClass({
    getInitialState() {
        return {
            showModal: false
        }
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
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateSeriesForm />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>
            </li>
        )
    }
})