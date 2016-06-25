require('bootstrap-loader');
require("css/globals/base.scss")
require("css/globals/NavBar.scss")
require("css/series/seriespage/SeriesPage.scss");

var React = require('react')
var ReactDOM = require('react-dom')

var NavBar = require('js/globals/NavBar');
var getCookie = require('js/globals/GetCookie')
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;


var SeriesPage = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <div className="seriesPage">
                    SeriesPage
                </div>
            </div>
        )
    }
})

ReactDOM.render(<SeriesPage />, document.getElementById('page-anchor'))