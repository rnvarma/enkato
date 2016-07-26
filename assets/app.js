import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

import NavBar from 'js/globals/NavBar'
import HomePage from 'js/home/homepage/HomePage'

import auth from 'auth'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="contentArea">
                    {this.props.children || <HomePage />}
                </div>
            </div>
        )
    }
}

const rootRoute = {
    childRoutes: [ {
        path: "/",
        component: App,
        indexRoute: HomePage,
        childRoutes: [
            require('js/authentication/login/routes'),
            require('js/authentication/register/routes'),
            require('js/series/seriesviewer/routes'),
            require('js/series/seriespage/routes'),
            require('js/userprofile/profile/routes'),
            require ('js/singlevideo/singlevideoview/routes'),
        ]
    } ]    
}

render((
    <Router
        history={browserHistory}
        routes={rootRoute}/>
), document.getElementById('page-anchor'))