require('bootstrap-loader');
require("css/globals/base.scss")
require('css/userdashboard/UserDashboard/UserDashboard.scss')

import React, { Component } from 'react'

import ProfileSeriesList from "js/userprofile/profile/ProfileSeriesList.jsx";
import CreateSeriesArea from "js/userdashboard/UserDashboard/CreateSeriesArea.jsx";

import auth from 'auth'

class UserDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subscribed_series: [],
            created_series: [],
            all_unsubscribed_series: [],
        }
    }

    componentWillMount() {
        $.ajax({
          url: "/1/userdashboard",
          dataType: 'json',
          cache: false,
          headers: {
            'Authorization': 'Token ' + localStorage.token
          },
          success: function(data) {
            this.setState(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    }

    render() {
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
}

module.exports = UserDashboard;