require('bootstrap-loader');
require("css/globals/base.scss")
require('css/userdashboard/UserDashboard/UserDashboard.scss')

var React = require('react')
var UnderConstruction = require("js/globals/UnderConstruction.jsx")

var ProfileSeriesList = require("js/userprofile/profile/ProfileSeriesList.jsx")
var CreateSeriesArea = require("js/userdashboard/UserDashboard/CreateSeriesArea.jsx")

module.exports = React.createClass({
    getInitialState: function() {
        return {
            subscribed_series: [],
            created_series: [],
            all_unsubscribed_series: [],
        }
    },
    componentWillMount: function() {
        $.ajax({
          url: "/1/userdashboard",
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
        var topList = (
            <ProfileSeriesList
                name="Subscribed Series"
                series={this.state.subscribed_series} />
        )
        var middleList = (
            <ProfileSeriesList
                name="Manage Your Series"
                series={this.state.created_series} />
        )
        var bottomList = (
            <ProfileSeriesList
                name="Browse All Series"
                series={this.state.all_unsubscribed_series} />
        )
        if (!this.state.subscribed_series.length) {
            topList = (
                <ProfileSeriesList
                    name="Explore These Topics"
                    series={this.state.all_unsubscribed_series} />
            )
            bottomList = (
                <div></div>
            )
        }
        if (!this.state.created_series.length) {
            middleList = (
                <CreateSeriesArea
                    name="Manage Your Series"/>
            )
        }
        return (
            <div className="userDashboard">
                {topList}
                {middleList}
                {bottomList}
            </div>
        )
    }
})

