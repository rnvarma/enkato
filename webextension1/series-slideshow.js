function showSlideshow(){

}

function getThumbnais(videoId, callback){
	$.ajax({
		url: "http://127.0.0.1:8000/2/s/" + vid_id,
		dataType: 'json',
		cache: false,
		success: function(data) {
			inDB = JSON.parse(data.inDatabase);
			if (inDB){
				vidData = data.videoData;
				var vidUUID = vidData.uuid;
			}
			callback(inDB, vidUUID);
			},
		error: function(status, err) {
			console.error(status, err.toString());
		}
	});
}

$(document).ready(function(){
	var images = getThumbnails();
	showSlideshow();
	chrome.runtime.onMessage.addListener(function(message, sender, response){
		if ((message.from == "popup") && (message.subject == "videoId for series data"){
			console.log("slideshow script got message from popup");
			var videoId = message.content;
			getThumbnails(videoId);
		}
	}
})