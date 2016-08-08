var React = require('react')
var FontAwesome = require('react-fontawesome');
var Row = require('react-bootstrap').Row;

module.exports = React.createClass({
    render: function(){
        return(
            <Row className="choice-row" onClick={this.props.handleClick}>
                <FontAwesome
                    className='circle-icon' 
                    name='circle-thin'/>
                <span className="add-option-button">Add Option</span>
            </Row>
        )
    }
})