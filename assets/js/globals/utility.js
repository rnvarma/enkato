
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
