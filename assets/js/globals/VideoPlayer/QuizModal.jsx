require('bootstrap-loader');
var React = require('react')

import { Button, Modal } from 'react-bootstrap';
module.exports= React.createClass({
    render:function(){
        return(
            <Modal
                show={true}
                container={this}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        ContainedModal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Lorem Ipsum Fuckity cukc Fuckity
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
})