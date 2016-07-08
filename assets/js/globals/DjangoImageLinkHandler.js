
module.exports = function(imgName) {
    var production = true;

    if (production) {
        return "https://enkato-static-files.s3.amazonaws.com/static/imgs/" + imgName
    } else {
        return "/static/imgs/" + imgName;
    }
}