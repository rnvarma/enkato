function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function getYTID(url){
  var regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regex);
  return (match&&match[7].length==11)? match[7] : false;
}


function showVideo(vidId, timestamp, vidTitle, vidUUID){
  var thumbnail = document.createElement("img");
  var thumbnailUrl = "http://img.youtube.com/vi/" + vidId + "/mqdefault.jpg";
  document.getElementById("main-video-wrapper").querySelector(".thumbnail").appendChild(thumbnail);
  thumbnail.setAttribute("src", thumbnailUrl);
  thumbnail.setAttribute("width", "240px");

  var titleBox = document.getElementById("main-video-wrapper").querySelector(".video-title");
  titleBox.innerHTML = vidTitle;
  titleBox.style.fontSize="14px";

  var watchButton = document.getElementById("main-video-wrapper").querySelector(".video-button");
  $(watchButton).click(function(){
    window.open("https://www.enkato.com/v/" + vidUUID);
  })

}



$(document).ready( function(){
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {from: "popup", subject:"url"}, function(info){
      if(info.videoId != false){
        showVideo(info.videoId, info.timestampText, info.videoTitle, info.videoUUID);
      }
    });
  });



})
