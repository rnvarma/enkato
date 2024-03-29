import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import FontAwesome from 'react-fontawesome';

import NavItem from 'react-bootstrap/lib/NavItem';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import EditSeriesForm from 'js/globals/EditSeriesForm';
import request from 'js/globals/HttpRequest';

class EditSeriesModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            name: this.props.name,
            description: this.props.description,
        }

        this.initForm = this.initForm.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.close = this.close.bind(this);
        this.open = this.open.bind(this)
        this.clearModal = this.clearModal.bind(this)
    }

    initForm() {
        this.setState({
            name: this.props.name,
            description: this.props.description,
        });
    }

    onNameChange(e) {
        this.setState({name: e.target.value})
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value})
    }

    onFormSubmit() {
        if (!this.state.name || !this.state.description) return;
        request.patch(`/1/series/${this.props.seriesUUID}`, {
            data: {
                name: this.state.name,
                description: this.state.description
            },
            success: (data) => {
                this.props.loadPageData();
                this.close();
                this.clearModal();
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
            <div className="createSeriesModal">
                <Button className="btn-secondary" onClick={this.open}>
                    <FontAwesome name="cog" />
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Series</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditSeriesForm
                        name = {this.props.name}
                        description = {this.props.description}
                        onNameChange={this.onNameChange}
                        onDescriptionChange={this.onDescriptionChange}
                        initForm={this.initForm}/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Cancel</Button>
                    <Button className="btn-primary" disabled = {!this.state.name || !this.state.description} onClick={this.onFormSubmit}>Submit</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditSeriesModal;