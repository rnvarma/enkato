require('css/globals/EditVideoPlayer/AddTopicButton.scss')

var React = require('react')

module.exports = React.createClass({
    render: function() {
        return (
            <div className="addTopicButton" onClick={this.props.addNewTopic}>
                Add a New Topic
            </div>
        )
    }
})