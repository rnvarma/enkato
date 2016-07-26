require('bootstrap-loader');
require('css/globals/base.scss');
require('css/userdashboard/UserDashboard/UserDashboard.scss');

import React, { Component } from 'react';

import request from 'js/globals/HttpRequest';
import ProfileSeriesList from 'js/userprofile/profile/ProfileSeriesList';
import CreateSeriesArea from 'js/userdashboard/UserDashboard/CreateSeriesArea';
import SeriesAnalyticsDisplay from 'js/userdashboard/UserDashboard/SeriesAnalyticsDisplay';

class UserDashboard extends Component {
    constructor() {
        super();

        this.state = {
            subscribed_series: [],
            created_series: [],
            all_unsubscribed_series: [],
        };
    }

    componentWillMount() {
        request.get('/1/userdashboard', {
            success: (data) => {
                this.setState(data);
            },
        });
    }

    render() {
        let topList;
            /*<ProfileSeriesList
                name="Subscribed Series"
                series={this.state.subscribed_series} />*/
        let middleList = (
            <ProfileSeriesList
                name="Manage Your Series"
                series={this.state.created_series} />
        );
        let bottomList = (
            <ProfileSeriesList
                name="Browse All Series"
                series={this.state.all_unsubscribed_series} />
        );
        if (!this.state.subscribed_series.length) {
            topList = (
                <ProfileSeriesList
                    name="Explore These Topics"
                    series={this.state.all_unsubscribed_series} />
            );
            bottomList = (
                <div></div>
            );
        }
        if (!this.state.created_series.length) {
            middleList = (
                <CreateSeriesArea
                    name="Manage Your Series" />
            );
        }
        const analyticsList = this.state.subscribed_series.map((series) => {
            return <SeriesAnalyticsDisplay series={series} />;
        });
        return (
            <div className="userDashboard">
                {topList}
                {analyticsList}
                {middleList}
                {bottomList}
            </div>
        );
    }
}

export default UserDashboard;