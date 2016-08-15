import React, { Component, PropTypes } from 'react';

import platform from 'js/globals/platform.js';
import request from 'js/globals/HttpRequest';

let auth2;
let googleUser;
class GoogleAuth extends Component {
    constructor(props) {
        super(props);

        console.log('loginModal called');
        console.log(this.props);
    }

    componentDidMount = () => {
        this.appStart();
    }

    initSigninV2 = () => {
        auth2 = gapi.auth2.init({
            client_id: '319492474629-1tkcmu2m5lfcbi9iekd5aojjs631grfv.apps.googleusercontent.com',
            scope: 'profile email https://www.googleapis.com/auth/youtube',
        });

        auth2.isSignedIn.listen(this.signinChanged);

        // Listen for changes to current user.
        auth2.currentUser.listen(this.userChanged);

        if (auth2.isSignedIn.get() === true) {
            auth2.signIn();
        }
        this.refreshValues();
        this.sendIdToken();
    }


    appStart = () => {
        console.log('app starting');
        gapi.load('auth2', this.initSigninV2);
    }

    signinChanged = (val) => {
        console.log('Signin state changed to ', val);
    };

    userChanged = (user) => {
        console.log('User now: ', user);
        googleUser = user;
    };

    sendIdToken = () => {
        console.log("sending id token");
        request.post('/googleauth', {
            data: {
                s: googleUser.getAuthResponse().id_token;
            },
            success: (data) => {
                console.log("successfully sent id token");
            }
            
    }

    refreshValues = () => {
        if (auth2) {
            console.log('Refreshing values...');
            googleUser = auth2.currentUser.get();
        }
    }

    render() {
        return (
            <div className="g-signin2" data-onsuccess="onSuccess"></div>
        );
    }
}

export default GoogleAuth;
