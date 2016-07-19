require('css/globals/DeleteConfirmModal.scss');

import React, { Component, PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class DeleteConfirmModal extends Component {
  render() {
    return (
      <div className="deleteConfirmModal">
        <Modal show={this.props.deleting} onHide={this.props.cancelCallback}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.description}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.cancelCallback}>Cancel</Button>
            <Button onClick={this.props.deleteCallback} bsStyle="danger">Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DeleteConfirmModal.propTypes = {
  deleting: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired,
};

DeleteConfirmModal.defaultProps = {
  title: 'Are you sure?',
};

export default DeleteConfirmModal;
