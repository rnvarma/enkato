
require("css/globals/QuizAddingForm/MCChoiceList.scss");

var React = require('react')

var MCChoiceNode = require('js/globals/QuizAddingForm/MCChoiceNode');

module.exports = React.createClass({
    render: function(){
        var shouldUseX = this.props.choiceList.length !== 1
        var MCChoiceNodes = this.props.choiceList.map(function(choice, index) {
            return (
                <MCChoiceNode
                    key={choice.id}
                    index={index}
                    choice={choice}
                    handleChoiceTextChange={this.props.handleChoiceTextChange}
                    addNewChoice={this.props.addNewChoice}
                    deleteChoice={this.props.deleteChoice}
                    makeChoiceIsCorrect={this.props.makeChoiceIsCorrect}
                    moveFocusUp={this.props.moveFocusUp}
                    moveFocusDownOrAddNewChoice={this.props.moveFocusDownOrAddNewChoice}
                    shouldUseX={shouldUseX}/>
            )
        }.bind(this))
        return (
            <div>
                {MCChoiceNodes}
            </div>
        )
    }
})