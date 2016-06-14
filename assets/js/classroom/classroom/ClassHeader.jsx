require("css/classroom/classroom/ClassHeader.scss");

var React = require('react')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var FourImagePanel = require('js/classroom/classroom/FourImagePanel')
var ClassInfo = require('js/classroom/classroom/ClassInfo')
var ClassMetaData = require('js/classroom/classroom/ClassMetaData')

module.exports = React.createClass({
    render: function() {
        return (
            <Row className="classHeader">
                <Col md={3} sm={3}>
                    <FourImagePanel images={this.props.data.thumbnails} />
                </Col>
                <Col md={6} sm={6}>
                    <ClassInfo data={this.props.data} />
                </Col>
                <Col md={3} sm={3}>
                    <ClassMetaData data={this.props.data} />
                </Col>
            </Row>
        )
    }
})