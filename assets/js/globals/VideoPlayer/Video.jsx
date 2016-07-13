require('bootstrap-loader');
require("css/globals/VideoPlayer/Video")
var React = require('react')
var QuizModal = require('js/globals/VideoPlayer/QuizModal')
import { Button, Modal } from 'react-bootstrap';


module.exports = React.createClass({ 
    render:function(){
        var height = this.props.videoDivHeight - this.props.controlBarHeight;
        return (
            <div 
                style={{height:height+"px"}}
                className="iframeWrapper">
                {this.props.renderVideo()}
                <div className="modal-container">
                    <Modal
                        show={true}
                        onHide{close}
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
                </div>
            </div>
        )
    }
});