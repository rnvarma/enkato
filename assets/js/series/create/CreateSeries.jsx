require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require("css/series/create/CreateSeries.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var getCookie = require('js/globals/GetCookie')
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;


var CreateSeries = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <div className="createSeries">
                    CreateSeries
                </div>
            </div>
        )
    }
})

ReactDOM.render(<CreateSeries />, document.getElementById('page-anchor'))