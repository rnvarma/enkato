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

var SeriesSideBar = require('js/series/seriespage/SeriesSideBar');
var SeriesMainArea = require('js/series/seriespage/SeriesMainArea');

var SeriesPage = React.createClass({
    getInitialState: function() {
        return {
            s_id: $("#s_id").attr("data-sid"),
            name: '',
            description: '',
            image: '',
            videos: [],
            creator: {},
            num_videos: 0,
            total_len: 0
        }
    },
    componentDidMount: function() {
        $.ajax({
          url: "/1/s/" + $("#s_id").attr("data-sid"),
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <NavBar />
                <div className="seriesPage">
                    <Row>
                        <Col md={2}>
                            <SeriesSideBar />
                        </Col>
                        <Col md={10}>
                            <SeriesMainArea
                                data={this.state}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
})

ReactDOM.render(<SeriesPage />, document.getElementById('page-anchor'))