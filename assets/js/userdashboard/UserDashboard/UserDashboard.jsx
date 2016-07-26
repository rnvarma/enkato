require('bootstrap-loader');
require("css/globals/base.scss")
require('css/userdashboard/UserDashboard/UserDashboard.scss')

import React, { Component } from 'react'

import auth from 'auth'
import request from 'js/globals/HttpRequest'
import ProfileSeriesList from "js/userprofile/profile/ProfileSeriesList.jsx";
import SubscribedSeriesList from "js/userprofile/profile/SubscribedSeriesList.jsx";
import CreateSeriesArea from "js/userdashboard/UserDashboard/CreateSeriesArea.jsx";

class UserDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subscribed_series: [],
            created_series: [],
            all_unsubscribed_series: [],
        }

        this.loadDataFromServer = this.loadDataFromServer.bind(this)
        this.loadSubscribedSeriesData = this.loadSubscribedSeriesData.bind(this)

    }

    componentWillMount() {
        this.loadDataFromServer()
        //loadSubscribedSeriesData()
    }

    loadDataFromServer() {
        request.get('/1/userdashboard', {
            success: (data) => {
                this.setState(data)
            }
        })
    }

    loadSubscribedSeriesData() {
        request.get('/1/studentanalytics', {
            success: (data) => {
                console.log(data)
            }
        })
    }

    render() {
        var topList = (
            <SubscribedSeriesList
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