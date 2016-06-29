require('css/globals/EditVideoPlayer/EditableTopicNode.scss')

var React = require('react')
var FontAwesome = require('react-fontawesome');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            editing: false,
            hovering: false,
        }
    },
    handleTopicClick:function() {
        this.props.handleTopicClick(this.props.topic.id, this.props.topic.time)
    },
    deleteTopic: function() {
        this.props.handleTopicDelete(this.props.topic.id);
    },
    onNameChange: function(e) {
        this.props.updateName(this.props.topic.id, e.target.value);
    },
    onInputFocus: function(e) {
        this.setState({editing: true})
    },
    onInputBlur: function(e) {
        this.setState({editing: false})
    },
    handleHoverOn: function(e) {
        this.setState({hovering: true})
    },
    handleHoverOff: function(e) {
        this.setState({hovering: false})
    },
    render: function() {
        return (
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
                    onBlur={this.onInputBlur}/>
                <FontAwesome
                    className="delete"
                    name='close'
                    onClick={this.deleteTopic}/>
            </div>
        )
    }
})