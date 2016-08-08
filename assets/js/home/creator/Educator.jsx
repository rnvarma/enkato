var React = require('react')
var ReactDOM = require('react-dom')

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var NavBar = require('js/globals/NavBar');

var Educator = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <Row>
                    <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
                        <h1 className="page-header">Become an Educator</h1>
                        <Button href="/createclass">Create a Classroom</Button>
                    </Col>
                </Row>
            </div>
        )
    }
})

ReactDOM.render(<Educator />, document.getElementById('page-anchor'))