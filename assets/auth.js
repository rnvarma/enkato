import request from 'js/globals/HttpRequest';

module.exports = {
    login (username, pass, cb, failCB, embed) {
        if (localStorage.token) {
            if (cb) cb(true);
            return;
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true);
            } else {
                if (cb) cb(false);
            }
        }, failCB, embed);
    },

    logout (cb) {
        delete localStorage.token;
        if (cb) cb();
    },

    loggedIn () {
        return !!localStorage.token;
    },

    getToken (username, pass, cb, failCB, embed) {
        request.post('/obtain-auth-token/', {
            data: {
                username,
                password: pass,
            },
            success(res) {
                cb({
                    authenticated: true,
                    token: res.token,
                });
            },
            error(res) {
                failCB(res.responseJSON.non_field_errors);                
            },
        }, embed);
    },
};
