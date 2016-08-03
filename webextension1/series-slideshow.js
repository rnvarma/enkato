function showSlideshowImages(thumbnails, vidUUIDs, seriesUUID, mainVidId, vidTitles){
    console.log("showing slideshow");
    var seriesWrapper = document.getElementById("series-wrapper");
    seriesWrapper.style.borderBottom = "0.5px solid rgb(181, 202, 241)";
    var slideWrapper = document.getElementById("series-wrapper").querySelector(".slide-wrapper");
    var mainUrl = "https://i.ytimg.com/vi/" + mainVidId + "/mqdefault.jpg";
    for (var i =0; i<thumbnails.length; i++){
        if(thumbnails[i] != mainUrl){
            var slideHolder = document.createElement("div");
            slideWrapper.appendChild(slideHolder);
            slideHolder.className = "slide-holder";

            var slide = document.createElement("img");
            slideHolder.appendChild(slide);
            slide.setAttribute("class", "mySlides");
            slide.setAttribute("src", thumbnails[i]);
            slide.setAttribute("title", vidTitles[i]);

            vidId = vidUUIDs[i];
            var url = "http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidId;
            slide.setAttribute("url", url);

            var name = document.createElement("div");
            slideHolder.appendChild(name);
            name.innerHTML = vidTitles[i];
            name.setAttribute("class", "slide-name");
        } 
    }
    $('.slide-holder').click(function(){
        var url = this.firstElementChild.getAttribute("url");
        window.open(url);
    });
    console.log("creating buttons");
}

function showSeriesTitle(){
    var title = document.getElementById("series-wrapper").querySelector(".series-title");
    title.innerHTML = "More in this series";
    title.style.fontSize = "16px";
    title.style.height = "15px";
    title.style.padding = "3px";
    title.style.textAlign = "center";
}
