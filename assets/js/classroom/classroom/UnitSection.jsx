var React = require('react')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var UnitList = require('js/classroom/classroom/UnitList');
var UnitVideoList = require('js/classroom/classroom/UnitVideoList');
var QuestionArea = require('js/classroom/classroom/QuestionArea');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            active: 1
        }
    },
    changeActiveUnit: function(order) {
        if (order == this.state.active) return;
        this.setState({active: order});
    },
    render: function() {
        return (
            <div className="unitSection">
                <Col md={3} sm={3}>
                    <UnitList
                        active={this.state.active}
                        data={this.props.data}
                        changeActiveUnit={this.changeActiveUnit}/>
                </Col>
                <Col md={6} sm={6}>
                    <UnitVideoList data={this.props.data} />
                </Col>
                <Col md={3} sm={3}>
                    <QuestionArea data={this.props.data} />
                </Col>
            </div>
        )
    }
})