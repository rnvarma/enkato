require('css/globals/ConfirmModal.scss');

import React, { Component, PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class ConfirmModal extends Component {
    render() {
        return (
            <div className="confirmModal">
                <Modal show={this.props.showing} onHide={this.props.cancelCallback}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.description}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.cancelCallback}>Cancel</Button>
                        {this.props.buttons}
                        <Button onClick={this.props.acceptCallback}
                                bsStyle={this.props.acceptBsStyle}>
                            {this.props.acceptText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

ConfirmModal.propTypes = {
    showing: PropTypes.bool.isRequired,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    acceptText: PropTypes.string,
    acceptBsStyle: PropTypes.string,
    acceptCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.element),
};

ConfirmModal.defaultProps = {
    title: 'Are you sure?',
    acceptText: 'Accept',
    acceptBsStyle: 'primary',
};

export default ConfirmModal;
