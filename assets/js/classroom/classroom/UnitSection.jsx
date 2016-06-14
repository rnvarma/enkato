var React = require('react')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

module.exports = React.createClass({
    render: function() {
        return (
            <div className="unitSection">
                <Col md={3} sm={3}>
                    <UnitList data={this.props.data}/>
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