
require("css/globals/QuizAddingForm/MCChoiceNode.scss");

var React = require('react')
var Row = require('react-bootstrap').Row;
var FontAwesome = require('react-fontawesome');

module.exports = React.createClass({
    handleChoiceTextChange: function(e){
        this.props.handleChoiceTextChange(
            e.target.value, 
            this.props.index,
            this.props.choice.id
        )
    },
    submit: function(e){
        e.preventDefault()
        this.props.moveFocusDownOrAddNewChoice(this.props.index)
    },
    deleteChoice: function(){
        if(this.props.shouldUseX)
            this.props.deleteChoice(this.props.choice.id, this.props.index)
    },
    onKeyDown: function(e) {
        if (e.keyCode === 8 && !this.props.choice.text) { // backspace
            e.preventDefault()
            this.props.deleteChoice(this.props.choice.id, this.props.index);
        } else if (e.keyCode === 38) {  // up
            this.props.moveFocusUp(this.props.index);
        } else if (e.keyCode == 40) {  // down
            this.props.moveFocusDownOrAddNewChoice(this.props.index);
        }
    }, 
    onChoiceSelected: function() {
        this.props.makeChoiceIsCorrect(this.props.choice.id);
    },
    render: function() {
        const { choice, index } = this.props;
        const placeholder = `Choice ${index + 1}`;

        return(
            <form onSubmit={this.submit}>
                <Row className="choice-row">
                    <FontAwesome
                        className={'circle-icon' + (choice.is_correct ? " correct" : "")}
                        name={choice.is_correct ? 'check-circle' : 'circle-thin'}
                        onClick={this.onChoiceSelected}/>
                    <input
                        className="choice-input"
                        type="text"
                        placeholder={placeholder}
                        onChange={this.handleChoiceTextChange}
                        id={choice.id}
                        onKeyDown={this.onKeyDown}
                        value={choice.text}/>
                    <FontAwesome 
                        className="timesIcon"
                        name='times'
                        onClick={this.deleteChoice}/>
                    <div type="submit">
                    </div>
                </Row>
            </form>
        )
    }
})