require("css/globals/CreateSeriesModal.scss")

import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import NavItem from 'react-bootstrap/lib/NavItem';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import CreateSeriesForm from 'js/globals/CreateSeriesForm';
import request from 'js/globals/HttpRequest';

class CreateSeriesModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            name: "",
            description: "",
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.close = this.close.bind(this);
        this.open = this.open.bind(this)
        this.clearModal = this.clearModal.bind(this)
    }

    onNameChange(e) {
        this.setState({name: e.target.value})
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value})
    }

    onFormSubmit() {
        if (!this.state.name || !this.state.description) return;
        request.post('/createseries', {
            data: {
                name: this.state.name,
                description: this.state.description
            },
            success: (data) => {
                if (data.status) {
                    browserHistory.push(`/s/${data.s_uuid}`);
                    this.close();
                    this.clearModal();
                } else {
                    console.log("sad face");
                }
            },
        })
    }

    clearModal() {
        this.setState({
            name: "",
            description: ""
        })
    }

    close() {
        this.setState({
            showModal: false
        })
    }
    open() {
        this.setState({
            showModal: true
        })
    }

    render() {
        return (
            <li className="createSeriesModal">
                <Button className="createBtn structabl-red" eventKey={3} onClick={this.open}>Create</Button>
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
                    <Button disabled = {!this.state.name || !this.state.description} onClick={this.onFormSubmit}>Create</Button>
                  </Modal.Footer>
                </Modal>
            </li>
        )
    }
}

export default CreateSeriesModal;