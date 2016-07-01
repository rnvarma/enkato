
require("css/globals/QuizAddingForm/ScrollButtonNode.scss");

var React = require('react')

module.exports = React.createClass({
    onClick: function(e) {
        this.props.scrollToFromButton(this.props.id, this.props.index)
    },
    render: function() {
        return(
            <div 
                onClick={this.onClick}
                className="singleNumberButton">
                {this.props.order}
            </div>
        )
    }
})
