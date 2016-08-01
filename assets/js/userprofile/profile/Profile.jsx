require('bootstrap-loader');
require("css/globals/NavBar.scss")
require("css/globals/base.scss")
require("css/userprofile/profile/Profile")

import React, { Component } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Col';

import ProfileSeriesList from 'js/userprofile/profile/ProfileSeriesList';
import CreateSeriesArea from 'js/userdashboard/UserDashboard/CreateSeriesArea.jsx';
import DjangoImageLinkHandler from 'js/globals/DjangoImageLinkHandler.js';
import request from 'js/globals/HttpRequest';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: this.props.params.userId,
            userdata: {},
            created_series: [],
            subscribed_series: [],
            viewseries: true
        }

        this.loadPageData = this.loadPageData.bind(this)
    }

    componentWillMount() {
        this.loadPageData()
    }

    loadPageData(userId, newId) {
        var url;
        if (newId)
            url = userId ? `/1/userprofile/${userId}` : '/1/userprofile';
        else
            url = this.state.userId ? `/1/userprofile/${this.state.userId}` : '/1/userprofile';
        request.get(url, {
            success: (data) => {
                this.setState(data);
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.params.userId != this.state.userId) {
            this.loadPageData(nextProps.params.userId, true);
            this.setState({
                userId: nextProps.params.userId
            })
        }
    }

    onSeriesViewClick() {
        this.setState({
            viewseries: true
        })
    }

    onAllVideosViewClick() {
        this.setState({
            viewseries: false
        })
    }

    render() {
        var profile_img = this.state.userdata.image || DjangoImageLinkHandler("blank_avatar.jpg")
        var subscribe_name = this.props.params.userId ? "Series They Subscribe To" : "Series You Subscribe To"
        var subscribed_series = (
            <ProfileSeriesList
                series={this.state.subscribed_series}
                name={subscribe_name}/>
        )
        var created_name = this.props.params.userId ? this.state.userdata.name + "'s series" : "Series by You"
        var created_series = (
            <ProfileSeriesList
                series={this.state.created_series}
                name={created_name}/>
        )
        if (!this.state.subscribed_series.length) {
            subscribed_series = <div></div>
        }
        if (!this.props.params.userId && !this.state.created_series.length) {
            created_series = (
                <CreateSeriesArea />
            )
        }
        return (
            <div className="profile">
                <div className="header">
                    <div className="imageArea">
                        <img src={profile_img} className="image" />
                    </div>
                    <div className="userInfo">
                        <div className="name">
                            {this.state.userdata.name}
                        </div>
                        <div className="bio">
                            {this.state.userdata.bio}
                        </div>
                    </div>
                    <div className="toggleMenu">
                        <div
                            className={"series" + (this.state.viewseries ? " active" : "")}
                            onClick={this.onSeriesViewClick}>
                            Series
                        </div>
                    </div>
                </div>
                {subscribed_series}
                {created_series}
            </div>
        )
    }
}

module.exports = Profile;