function getYTID(url){
	var regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regex);
	return (match&&match[7].length==11)? match[7] : false;
}


function showVideo(vidId, timestamp, vidTitle, vidUUID, seriesUUID){
	var thumbnail = document.createElement("img");
	var thumbnailUrl = "http://img.youtube.com/vi/" + vidId + "/mqdefault.jpg";
	document.getElementById("main-video-wrapper").querySelector(".thumbnail").appendChild(thumbnail);
	thumbnail.setAttribute("src", thumbnailUrl);
	thumbnail.setAttribute("width", "250px");

	var titleBox = document.getElementById("main-video-wrapper").querySelector(".video-title");
	titleBox.innerHTML = vidTitle;
	titleBox.style.fontSize="14px";
	titleBox.style.margin ="7px";

	var watchButton = document.createElement("img");
	document.getElementById("main-video-wrapper").querySelector(".video-button").appendChild(watchButton);
	var imgurl = chrome.extension.getURL("main.gif");
	
	watchButton.setAttribute("src", imgurl);
	watchButton.setAttribute("height", "20px");
	watchButton.style.margin="10px"; 
	watchButton.style.padding = "3px";
	watchButton.style.backgroundColor = "white";
	watchButton.style.border = "1px solid #0E133E";
	watchButton.style.borderRadius = "20px";
	watchButton.style.cursor = "pointer";  

	var mainWrapper = document.getElementById("main-video-wrapper");
	mainWrapper.style.border = "1px solid #0E133E";
	$(watchButton).click(function(){
		window.open("http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidUUID);//add time stamp
	})
}

function showNoVideoMessage(){
	var noVideoDiv = document.createElement("div");
	document.getElementById("main-video-wrapper").appendChild(noVideoDiv);
	noVideoDiv.innerHTML = "Sorry, there are no videos from enkato on this page";
}

function showTopics(topics){
	var topicWrapper = document.getElementById("topic-list-wrapper");
	topicWrapper.style.border= "1px solid #0E133E";

	var titleDiv = topicWrapper.querySelector(".topic-header");
	titleDiv.innerHTML="Topics";
	titleDiv.style.fontSize = "16px";
	titleDiv.style.padding = "3px 3px 0px";

	var listContainer = document.querySelector(".topics-list");
	listContainer.style.margin = "0px 5px 5px";
	if (topics.length < 4){
		for(i=0; i<topics.length; i++){
			var topic = document.createElement("LI");
			listContainer.appendChild(topic);
			topic.innerHTML = topics[i].name;
			
			$(topic).click(function(){
				window.open("http://127.0.0.1:8000/v/" + vidUUID);//add time stamp
			});
		}
	}
	else{
		for(i=0; i<4; i++){
			var topic = document.createElement("LI");
			listContainer.appendChild(topic);
			topic.innerHTML = topics[i].name;
			
			$(topic).click(function(){
				window.open("http://127.0.0.1:8000/v/" + vidUUID);//add time stamp
			});
		}

		var topicOverfill = document.createElement("span");
		topicWrapper.appendChild(topicOverfill);
		topicOverfill.innerHTML = "More topics on enkato";
		topicOverfill.style.fontSize = "15px";
		topicOverfill.style.textAlign = "center";
	}
}

function showSeriesTitle(){
	var title = document.getElementById("series-wrapper").querySelector(".series-title");
	title.innerHTML = "More in this series";
	title.style.fontSize = "16px";
}

function findTopicList(vid_uuid, callback){
	$.ajax({
		url: "http://127.0.0.1:8000/1/v/" + vid_uuid,
		dataType: 'json',
		cache: false,
		success: function(data) {
			var topics = data.topicList;
			console.log(topics);
			callback(topics);
			},
		error: function(status, err) {
			console.error(status, err.toString());
		}
	});

}

function findInDatabase(vid_id, callback) {
	$.ajax({
		url: "http://127.0.0.1:8000/2/v/" + vid_id,
		dataType: 'json',
		cache: false,
		success: function(data) {
			inDB = JSON.parse(data.inDatabase);
			if (inDB){
				var vidData = data.videoData;
				var vidUUID = vidData.uuid;
			}
			callback(inDB, vidUUID);
			},
		error: function(status, err) {
			console.error(status, err.toString());
		}
	});
}

function getSeriesInfo(videoId, callback){
	$.ajax({
		url: "http://127.0.0.1:8000/2/s/" + videoId,
		dataType: 'json',
		cache: false,
		success: function(data) {
			console.log(data);
			partOfSeries = JSON.parse(data.inSeries);
			if (partOfSeries){
				var seriesInfo = data.seriesData;
				var vidUUIDs = seriesInfo.videoUUIDs;
				var seriesId = seriesInfo.seriesUUID;
				var thumbnails = seriesInfo.seriesThumbnails;
				var vidTitles = seriesInfo.videoTitles;
			}
			callback(partOfSeries, seriesId, thumbnails, vidUUIDs, vidTitles);
			},
		error: function(status, err) {
			console.error(status, err.toString());
		}
	});
}



$(document).ready( function(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {from: "popup", subject:"url"}, function(info){
			var vidId = info.videoId;
			if(vidId != false){
				getSeriesInfo(vidId, function(inSeries, seriesUUID, thumbnails, vidUUIDs, vidTitles){
					console.log("got the thumbnails")
					findInDatabase(vidId, function(inDB, vidUUID){
						showVideo(vidId, info.timestampText, info.videoTitle, vidUUID, seriesUUID);
						findTopicList(vidUUID, function(topics){
							if (topics != null){
								showTopics(topics);
							}
						});
						showSeriesTitle();
						showSlideshowImages(thumbnails, vidUUIDs, seriesUUID, vidId, vidTitles);
					});
				});
			}
			else{
				showNoVideoMessage();
			}
		});
	});



})
