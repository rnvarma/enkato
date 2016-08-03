function getYTID(url){
	var regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regex);
	return (match&&match[7].length==11)? match[7] : false;
}

function timeToSeconds(time){
	var timeA = time.split(":");
    var seconds = 0;
    if(timeA.length == 2){
        seconds = Number(timeA[0])*60 + Number(timeA[1]);
    }
    else if(timeA.length==3){
        seconds = Number(timeA[0])*3600 + Number(timeA[1])*60 + Number(timeA[2]);
    }
    return seconds;
}

function showHeader(){
	var headerLogo = document.getElementById("header").firstElementChild;
	$(headerLogo).click(function(){
		window.open("http://127.0.0.1:8000");
	});
}

function showVideo(vidId, timestamp, vidTitle, vidUUID, seriesUUID){
	var thumbnail = document.createElement("img");
	var thumbnailUrl = "http://img.youtube.com/vi/" + vidId + "/mqdefault.jpg";
	document.getElementById("main-video-wrapper").querySelector(".thumbnail").appendChild(thumbnail);
	thumbnail.setAttribute("src", thumbnailUrl);
	thumbnail.setAttribute("width", "240px");
	thumbnail.style.boxShadow = "2px 2px 2px rgba(0,0,0,0.3)";

	var titleBox = document.getElementById("main-video-wrapper").querySelector(".video-title");
	titleBox.innerHTML = vidTitle;
	titleBox.style.height = "30px";
	titleBox.style.textOverflow= "ellipsis";
	titleBox.style.fontSize="16px";
	titleBox.style.margin ="3px 3px 5px 3px";

	var watchButton = document.createElement("img");
	document.getElementById("main-video-wrapper").querySelector(".video-button").appendChild(watchButton);
	var imgurl = chrome.extension.getURL("main.gif");
	
	watchButton.setAttribute("src", imgurl);
	watchButton.setAttribute("height", "22px"); 
	watchButton.style.padding = "3px";
	watchButton.style.backgroundColor = "white";
	watchButton.style.border= "0.5px solid #425d90";
	watchButton.style.borderRadius = "20px";
	watchButton.style.cursor = "pointer";  
	watchButton.style.boxShadow = "rgba(0, 0, 0, 0.298039) 2px 2px 2px"

	var tsSeconds = timeToSeconds(timestamp);
	$(watchButton).click(function(){
		window.open("http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidUUID+ "?t=" + tsSeconds);//add time stamp
	})

	var mainWrapper = document.getElementById("main-video-wrapper");
	mainWrapper.style.backgroundColor = "#DCE6E1";
}

function showNoVideoMessage(){
	var contentWrapper = document.getElementById("content-wrapper");
	document.body.removeChild(contentWrapper);

	var noVideoDiv = document.getElementById("no-video");	
	var noVideoText = document.createElement("div");
	noVideoDiv.appendChild(noVideoText);
	noVideoText.innerHTML = "Sorry, there are no available videos on this page.";
	noVideoText.style.width = "100%";
	noVideoText.style.margin = "25px 4px";

	var enkatoButton = document.createElement("img");
	noVideoDiv.appendChild(enkatoButton);
	enkatoButton.setAttribute("src", "go-to-enkato.gif");
	enkatoButton.className = "enkato-button";
	enkatoButton.style.cursor = "pointer";
	enkatoButton.setAttribute("height", "30px");

}

function showTopics(topics, vidUUID, seriesUUID){
	var topicWrapper = document.getElementById("topic-list-wrapper");
	topicWrapper.style.borderBottom = "0.5px solid rgb(181, 202, 241)";
       
	var titleDiv = topicWrapper.querySelector(".topic-header");
	titleDiv.innerHTML="Topics";
	titleDiv.style.textAlign= "center";

	var listContainer = document.querySelector(".topics-list");
	listContainer.style.margin = "3px";
	if (topics.length < 4){
		for(i=0; i<topics.length; i++){
			var topic = document.createElement("div");
			topic.className = "topic-node";
			listContainer.appendChild(topic);
			topic.innerHTML = topics[i].name;
			topic.setAttribute("time", topics[i].time);
			topic.setAttribute("url", "http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidUUID + "?t=" + topics[i].time);
		}
	}
	else{
		for(i=0; i<4; i++){
			var topic = document.createElement("div");
			listContainer.appendChild(topic);
			topic.innerHTML = topics[i].name;
			topic.setAttribute("time", topics[i].time);
			//topic.setAttribute("onclick", topicURL(this));
		}

		var topicOverfill = document.createElement("span");
		topicWrapper.appendChild(topicOverfill);
		topicOverfill.innerHTML = "More topics on enkato";
		topicOverfill.style.fontSize = "15px";
		topicOverfill.style.textAlign = "center";
	}

	$('.topic-node').click(function(){
		var url = this.getAttribute("url");
		window.open(url);
	});
}

function showNoTopicsMessage(){
	var topicWrapper = document.getElementById("topic-list-wrapper");
	topicWrapper.style.borderBottom= "0.5px solid rgb(181, 202, 241)";


	var titleDiv = topicWrapper.querySelector(".topic-header");
	titleDiv.innerHTML="Topics";

	var noTopicsDiv = document.createElement("div");
	document.getElementById("topic-list-wrapper").appendChild(noTopicsDiv);
	noTopicsDiv.className = "no-topics";
	noTopicsDiv.innerHTML = "The instructor didn't make any topics for this video.";

}

function showQuizDiv(seriesUUID, vidUUID){
	var quizWrapper = document.getElementById("quiz-wrapper");
	quizWrapper.style.borderBottom= "0.5px solid rgb(181, 202, 241)";

	var quizButton = document.createElement("img");
	quizWrapper.appendChild(quizButton);
	quizButton.setAttribute("src", "quizbutton.gif");
	quizButton.className = "quiz-button";
	quizButton.setAttribute("height", "60px");
	$(quizButton).click(function(){
		window.open("http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidUUID + "?quiz=true");
	})
}

function findTopicList(vid_uuid, callback){
	$.ajax({
		url: "http://127.0.0.1:8000/1/v/" + vid_uuid,
		dataType: 'json',
		cache: false,
		success: function(data) {
			var topics = data.topicList;
			callback(topics);
			},
		error: function(status, err) {
			console.error(error.statusText, err.toString());
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
			callback(inDB, vidData, vidUUID);
			},
		error: function(status, err) {
			console.error(error.statusText, err.toString());
		}
	});
}

function getSeriesInfo(videoId, callback){
	$.ajax({
		url: "http://127.0.0.1:8000/2/s/" + videoId,
		dataType: 'json',
		cache: false,
		success: function(data) {
			partOfSeries = data.inSeries;
			if (partOfSeries){
				var seriesInfo = data.seriesVideoData;
				var vidUUIDs = seriesInfo.videoUUIDs;
				var seriesId = seriesInfo.seriesUUID;
				var thumbnails = seriesInfo.seriesThumbnails;
				var vidTitles = seriesInfo.videoTitles;
			}
			callback(partOfSeries, seriesId, thumbnails, vidUUIDs, vidTitles);
			},
		error: function(status, err) {
			console.error(error.statusText, err.toString());
		}
	});
}



$(document).ready( function(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {from: "popup", subject:"url"}, function(info){
			showHeader();
			if((info != null) && (info.videoId != false)){
				var vidId = info.videoId;
				getSeriesInfo(vidId, function(inSeries, seriesUUID, thumbnails, vidUUIDs, vidTitles){
					console.log("got the thumbnails");
					findInDatabase(vidId, function(inDB, vidData, vidUUID){
						console.log("find in database being run");
						if(inDB && (!vidData.is_private)){
							showVideo(vidId, info.timestampText, info.videoTitle, vidUUID, seriesUUID);
							findTopicList(vidUUID, function(topics){
								if (topics.length != 0){
									console.log("showing topics yo");
									showTopics(topics, vidUUID, seriesUUID);
								}
								else{
									console.log("there are no topics whattt");
									showNoTopicsMessage();
								}
							});
							showSeriesTitle();
							showSlideshowImages(thumbnails, vidUUIDs, seriesUUID, vidId, vidTitles);
							showQuizDiv(seriesUUID, vidUUID);
							//showMoreAtEnkato();							
						}
						else{
							console.log("show no video");
							showNoVideoMessage();
						}
					});
				});
			}
			else{
				console.log("video is not in database");
				showNoVideoMessage();
			}
		});
	});



})
