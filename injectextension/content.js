function getYTID(url){
  var regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regex);
  return (match&&match[7].length==11)? match[7] : false;
}

function findInDatabase(vid_id, vid_num, callback) {
    $.ajax({
        url: "http://127.0.0.1:8000/1/ytvalidatevideo/" + vid_id,
        dataType: 'json',
        cache: false,
        success: function(data) {
        var inDB = JSON.parse(data.inDatabase);
        if (inDB){
            var vidData = data.videoData;
            var vidUUID = vidData.uuid;
        }
        callback(inDB, vid_num, vidUUID);
        },
        error: function(status, err) {
        console.error(status, err.toString());
        }
    });
}

$(document).ready(function() {
    var vid_id = getYTID(windURL);
})