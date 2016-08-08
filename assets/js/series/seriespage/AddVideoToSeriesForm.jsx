import React from 'react';

import FontAwesome from 'react-fontawesome';

import { Col, Form, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';

export default class AddToVideoSeriesForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="addVideoToSeriesForm">
                <Form>
                    <ControlLabel>Enter one or more URLs to the YouTube video(s) you would like to add to the series.</ControlLabel>
                    <FormControl className="addVideoTextArea" rows={10} onChange={this.props.onURLAdded} componentClass="textarea" type="text" placeholder="Enter each URL on a new line." value={this.props.urls} />
                </Form>
            </div>
        );
    }
}
