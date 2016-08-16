import getCookie from 'js/globals/GetCookie';

module.exports = {
    get: function(url, opt, embed) {
        $.ajax({
            url: `${embed ? 'https://www.enkato.com' : ''}${url}`,
            dataType: 'json',
            cache: opt.cache || false,
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token
            } : {},
            success: function(data) {
                if (opt.success) opt.success(data)
            },
            error: function(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err)
                else console.error(url, status, err.toString());
            }
        });
    },
    post: function(url, opt, embed) {
        $.ajax({
            type: 'POST',
            url: `${embed ? 'https://www.enkato.com' : ''}${url}`,
            data: opt.data || {},
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token
            } : {},
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            },
            success: function(data){
                if (opt.success) opt.success(data)
            },
            error: function(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err)
                else console.error(url, status, err.toString());
            }
        })
    },
    patch: function(url, opt, embed) {
        $.ajax({
            type: 'PATCH',
            url: `${embed ? 'https://www.enkato.com' : ''}${url}`,
            data: opt.data || {},
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token
            } : {},
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            },
            success: function(data){
                if (opt.success) opt.success(data)
            },
            error: function(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err)
                else console.error(url, status, err.toString());
            }
        })
    },
    delete: function(url, opt, embed) {
        $.ajax({
            type: 'DELETE',
            url: `${embed ? 'https://www.enkato.com' : ''}${url}`,
            data: opt.data || {},
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token
            } : {},
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            },
            success: function(data){
                if (opt.success) opt.success(data)
            },
            error: function(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err)
                else console.error(url, status, err.toString());
            }
        })
    },
    patch: function(url, opt, embed) {
        $.ajax({
            type: 'PATCH',
            url: `${embed ? 'https://www.enkato.com' : ''}${url}`,
            data: opt.data || {},
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token
            } : {},
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            },
            success: function(data){
                if (opt.success) opt.success(data)
            },
            error: function(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err)
                else console.error(url, status, err.toString());
            }
        })
    }
}