require('css/globals/EditVideoPlayer/EditableTopicNode.scss')

import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

export default class EditableTopicNode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            hovering: false
        }

        this.handleTopicClick = this.handleTopicClick.bind(this)
        this.deleteTopic = this.deleteTopic.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onInputFocus = this.onInputFocus.bind(this)
        this.onInputBlur = this.onInputBlur.bind(this)
        this.handleHoverOn = this.handleHoverOn.bind(this)
        this.handleHoverOff = this.handleHoverOff.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleTopicClick() {
        this.props.handleTopicClick(this.props.topic.id, this.props.topic.time)
    }

    deleteTopic() {
        this.props.handleTopicDelete(this.props.topic.id);
    }

    onNameChange(e) {
        this.props.updateName(this.props.topic.id, e.target.value);
    }

    onInputFocus(e) {
        this.setState({editing: true})
    }

    onInputBlur(e) {
        this.setState({editing: false})
    }

    handleHoverOn(e) {
        this.setState({hovering: true})
    }

    handleHoverOff(e) {
        this.setState({hovering: false})
    }

    submitForm(e){
        e.preventDefault()
        this.props.playVideo()
    }

    render() {
        return (
            <form className="editableTopicNodeContainer" onSubmit={this.submitForm}>
                <div
                    className={"editableTopicNode" + (this.state.editing ? " active" : "")
                                                   + (this.state.hovering ? " hover" : "")}
                    onClick={this.handleTopicClick}
                    onMouseEnter={this.handleHoverOn}
                    onMouseLeave={this.handleHoverOff}>
                    <div className="time">
                        {this.props.topic.time_clean}
                    </div>
                    <input
                        value={this.props.topic.name}
                        onChange={this.onNameChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                        id={this.props.id}/>
                    <FontAwesome
                        className="delete"
                        name='close'
                        onClick={this.deleteTopic}/>
                </div>
                <div type="submit"></div>
            </form>
        )
    }
}