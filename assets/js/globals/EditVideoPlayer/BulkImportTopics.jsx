require('css/globals/EditVideoPlayer/BulkImportTopics')

import React, { Component } from 'react';

import request from 'js/globals/HttpRequest';
import Button from 'react-bootstrap/lib/Button';

export default class BulkImportTopics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadData: ''
        }

        this.onTextChange = this.onTextChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onTextChange(e) {
        this.setState({
            uploadData: e.target.value
        })
    }

    onSubmit() {
        request.post('/parseimporttopics', {
            data: {
                s: this.state.uploadData
            },
            success: (data) => {
                for (var i = 0; i < data.new_topics.length; i++) {
                    var new_topic = data.new_topics[i]
                    this.props.addNewTopic(new_topic.name, new_topic.time)
                }
                this.setState({
                    uploadData: ''
                })
            }
        })
    }

    render() {
        return (
            <div className="bulkImportTopics">
                <div className="instruction">
                    Bulk import topics with new line separated entries that go by "x:xx topic name" where x:xx is the time in the video
                </div>
                <textarea
                    placeholder="ex: 5:49 Topic 2"
                    onChange={this.onTextChange}
                    value={this.state.uploadData}></textarea>
                <Button
                    className="structabl-red"
                    onClick={this.onSubmit}>
                    Import Topics
                </Button>
            </div>
        )
    }
}