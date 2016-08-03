window.onpopstate = function(event){
  console.log("popstate event triggered");
  location.reload();
}


function showMainMessage(vidUUID, seriesUUID) {
  var image = document.createElement("img");
  var prevDiv = document.getElementById("placeholder-player").appendChild(image);
  var imgurl = chrome.extension.getURL("images/main.gif");

  image.setAttribute("src", imgurl);
  image.setAttribute("height", "20px");
  image.style.cursor = "pointer";  
  image.onclick = function(){
    window.open("http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidUUID);
  } 
}

function showSideMessage(vidNum, vidUUID, seriesUUID){
  var image = document.createElement("img");
  var parentDivs = document.getElementById("watch7-sidebar-modules").querySelectorAll(".content-wrapper");
  var parentNode = parentDivs[vidNum].appendChild(image);
  var imgurl = chrome.extension.getURL("images/main.gif");

  image.setAttribute("src", imgurl);
  image.setAttribute("height", "15px");
  image.style.cursor = "pointer";  

  $(image).click(function(){
    window.open("http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidUUID);
  });
}

function showSearchMessage(vidNum, vidUUID, seriesUUID){
  var image = document.createElement("img");
  var allParents = document.getElementById("results").firstElementChild.lastElementChild.firstElementChild.children;
  var parent = allParents[vidNum].firstElementChild.firstElementChild.lastElementChild.appendChild(image);
  var imgurl = chrome.extension.getURL("images/main.gif");

  image.setAttribute("src", imgurl);
  image.setAttribute("height", "15px");  
  image.style.cursor = "pointer";  

  $(image).click(function(){
    window.open("http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidUUID);
    return false;
  });
}

function getSidebarInfo(){
  var allSideVideos = document.getElementById("watch7-sidebar-modules").querySelectorAll(".content-wrapper");
  var urls = [];
  for (var i =0; i<allSideVideos.length; i++){
    getUrlNode(allSideVideos[i], function(urlNode){
      urls.push(urlNode.href);
    })  
  };
  var ids = [];
  for(var i =0; i<urls.length; i++){
    ids.push(getYTID(urls[i]));
  };
  return (ids);
}

function getUrlNode(sideVideo, callback){
  var urlNode = sideVideo.firstElementChild;
  callback(urlNode);
}

function getSearchVidInfo(){
  var allSearchVids = document.getElementById("results").firstElementChild.lastElementChild.firstElementChild.children;
  if(allSearchVids == null){
    return false;
  }
  var ids = [];
  for (var i =0; i<allSearchVids.length; i++){
    var child = allSearchVids[i].firstElementChild;
    var id = child.getAttribute("data-context-item-id");
    if (id != null){
      ids.push(id);
    }
  };
  console.log(ids);
  return (ids);
}

function getYTID(url){
  var regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regex);
  return (match&&match[7].length==11)? match[7] : false;
}


function findInDatabase(vid_id, vid_num, callback) {
  $.ajax({
          url: "http://127.0.0.1:8000/2/v/" + vid_id,
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

function getSeriesUUID(vid_id, callback){
  $.ajax({
    url: "http://127.0.0.1:8000/2/s/" + vid_id,
    dataType: 'json',
    cache: false,
    success: function(data) {
       var seriesInfo = data.seriesVideoData;
      var seriesUUID = seriesInfo.seriesUUID;
      callback(seriesUUID);
    },
    error: function(status, err) {
      console.error(error.statusText, err.toString());
    }
  });
}

var windURL = "" + window.location.href;

$(document).ready( function() {
  var vid_id = getYTID(windURL);
  if(vid_id != false){
    var mainNum = 0;
    findInDatabase(vid_id, mainNum, function(inDB, mainNum, mainUUID){
      if (inDB){
        getSeriesUUID(vid_id, function(seriesUUID){
          showMainMessage(mainUUID, seriesUUID);
        });
      }
    });
    console.log("beginning side videos");
    var sideVidIds = getSidebarInfo();
    for (var i =0; i<sideVidIds.length; i++){
      findInDatabase(sideVidIds[i], i, function(inDB, i, sideUUID){
        if(inDB){
          getSeriesUUID(sideVidIds[i], function(seriesUUID){
            showSideMessage(i, sideUUID, seriesUUID);
          });
        }
      });
    };
  }
  else if (vid_id == false){
    var searchIds = getSearchVidInfo();
    if(searchIds != false){
      for(var i =0; i<searchIds.length; i++){
        var searchUUID = "";
        findInDatabase(searchIds[i], i, function(inDB, i, searchUUID){
          if(inDB){
            getSeriesUUID(searchIds[i], function(seriesUUID){
              showSearchMessage(i, searchUUID, seriesUUID);
            })
          }
        });
      };
    }
  }
  console.log("finished");
})


chrome.runtime.onMessage.addListener(function(message, sender, response){
  if((message.from== "popup") && (message.subject == "url")){
    console.log("got message from popup");
    
    var timestampNode = document.getElementById("movie_player").querySelector(".ytp-storyboard-lens-timestamp");
    var timestamp = timestampNode.textContent;

    var metaInfo = document.getElementsByTagName('meta');
    var title = metaInfo[0].content;

    var vidId = getYTID(windURL);
    var info = {};
    info = {
      videoId: vidId,
      timestampText: timestamp,
      videoTitle: title,
    };
    response(info);
  }
  else{
    console.log("got message from bkg");
    console.log(message.newUrl);
    if(message.newUrl != windURL){
      console.log("reloading the page");
      location.reload();
    }
  }
})




