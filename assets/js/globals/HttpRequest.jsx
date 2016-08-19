import getCookie from 'js/globals/GetCookie';

const embedRoot = 'http://127.0.0.1:8000'; // no trailing slash

module.exports = {
    get(url, opt, embed) {
        $.ajax({
            url: `${embed ? embedRoot : ''}${url}`,
            dataType: 'json',
            cache: opt.cache || false,
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token,
            } : {},
            success(data) {
                if (opt.success) opt.success(data);
            },
            error(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err);
                else console.error(url, status, err.toString());
            },
        });
    },
    post(url, opt, embed) {
        $.ajax({
            type: 'POST',
            url: `${embed ? embedRoot : ''}${url}`,
            data: opt.data || {},
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token,
            } : {},
            beforeSend(xhr) {
                if (!embed) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
                }
            },
            success(data) {
                if (opt.success) opt.success(data);
            },
            error(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err);
                else console.error(url, status, err.toString());
            },
        });
    },
    delete(url, opt, embed) {
        $.ajax({
            type: 'DELETE',
            url: `${embed ? embedRoot : ''}${url}`,
            data: opt.data || {},
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token,
            } : {},
            beforeSend(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success(data) {
                if (opt.success) opt.success(data);
            },
            error(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err);
                else console.error(url, status, err.toString());
            },
        });
    },
    patch(url, opt, embed) {
        $.ajax({
            type: 'PATCH',
            url: `${embed ? embedRoot : ''}${url}`,
            data: opt.data || {},
            headers: localStorage.token ? {
                'Authorization': 'Token ' + localStorage.token,
            } : {},
            beforeSend(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success(data) {
                if (opt.success) opt.success(data);
            },
            error(xhr, status, err) {
                if (opt.error) opt.error(xhr, status, err);
                else console.error(url, status, err.toString());
            },
        });
    },
};
