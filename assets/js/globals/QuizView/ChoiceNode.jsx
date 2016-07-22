require("css/globals/QuizView/ChoiceNode");

var React = require('react');

var FontAwesome = require('react-fontawesome');

module.exports = React.createClass({
    selectChoice: function(){
        this.props.selectChoice(this.props.index)
    },
    render:function(){
        return(
            <div className="choiceNode " id={this.props.correctness}>
                <FontAwesome
                    className="circle-icon"
                    id={(this.props.isSelected)?"selected":""}
                    name={(this.props.isSelected)?"circle":"circle-thin"}
                    onClick={this.selectChoice}
                />
                <span className="choiceText" onClick={this.selectChoice}>
                    {this.props.choiceText}
                </span>
            </div>
        ) 
    }
})