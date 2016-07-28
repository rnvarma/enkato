import getCookie from 'js/globals/GetCookie'

module.exports = {
    login: function(username, pass, cb, failCB) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        }, failCB)
    },

    logout: function(cb) {
        delete localStorage.token
        if (cb) cb()
    },

    loggedIn: function() {
        return !!localStorage.token
    },

    getToken: function(username, pass, cb, failCB) {
        $.ajax({
            type: 'POST',
            url: '/obtain-auth-token/',
            data: {
                username: username,
                password: pass
            },
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            },
            success: function(res){
                cb({
                    authenticated: true,
                    token: res.token
                })
            },
            error: function(res) {
                failCB(res.responseJSON.non_field_errors)
            }
        })
    }, 
}