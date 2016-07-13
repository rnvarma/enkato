/* can be used to get csrf token when name is csrftoken */
export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/* adds an s or es to the end of string if needed, based on quantity */
export function pluralize(string, quantity, ending='s') {
    return quantity == 1 ? string : `${string}${ending}`;
}

export function truncate(string, quantity, ellipses=false) {
    var trunc = string.slice(0, quantity);
    if (ellipses) return trunc + "...";
    else return trunc;
}

/* seconds to M:SS or H:MM:SS, decimals retained */
export function styleDuration(seconds) {
    let sec = seconds % 60;
    let min = Math.floor(seconds / 60) % 60;
    let hours = Math.floor(seconds / 3600);

    if (sec < 10) {
        sec = "0" + sec;
    }

    if (min < 10 && hours > 0) {
        min = "0" + min
    }

    if (hours > 0) {
        return `${hours}:${min}:${sec}`;
    } else {
        return `${min}:${sec}`;
    }
}

/* returns string with ellipses if it's greater than length */
export function truncate(string, length) {
    if (string.length > length) {
        return string.substring(0, length) + '...';
    }
    return string;
}