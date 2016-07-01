
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
        console.log(this.props.index)
        if(this.props.shouldUseX)
            this.props.deleteChoice(this.props.choice.id)
    },
    onKeyDown: function(e) {
        if (e.keyCode == 8 && !this.props.choice.text && this.props.index > 0) {
            e.preventDefault()
            this.props.deleteChoice(this.props.choice.id, this.props.index)
        }
    },
    render: function(){
        //add 1 to index because its an index // starts @ 0 ! 1
        var placeholder = "Choice "+(this.props.index+1)
        return(
            <form onSubmit={this.submit}>
                <Row className="choice-row">
                    <FontAwesome
                        className='circle-icon' 
                        name='circle-thin'/>
                    <input
                        className="choice-input"
                        type="text"
                        placeholder={placeholder}
                        onChange={this.handleChoiceTextChange}
                        id={this.props.choice.id}
                        onKeyDown={this.onKeyDown}
                        value={this.props.choice.text}/>
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