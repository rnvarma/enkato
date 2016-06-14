require('bootstrap-loader');
require("css/globals/base.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var NavBar = require('js/globals/NavBar');

var Classroom = React.createClass({
    getInitialState: function() {
        return {
            c_id: '',
            c_data: {}
        }
    },
    componentDidMount: function() {
        var c_id =$("#c_id").attr("data-cid")
        this.setState({c_id: c_id})
        $.ajax({
          url: "/1/c/" + c_id,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({c_data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {        
        return (
            <Row>
                <NavBar />
                <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                    <h1 className="page-header">{this.state.c_data.name}</h1>
                    <a href={"/c/" + this.state.c_id + "/uploadvideo"}>Upload a video </a>
                </Col>
            </Row>
        )
    }
})

ReactDOM.render(<Classroom />, document.getElementById('page-anchor'))