function showSlideshowImages(thumbnails, vidUUIDs, seriesUUID, mainVidId, vidTitles){
    console.log("showing slideshow");
    var seriesWrapper = document.getElementById("series-wrapper");
    seriesWrapper.style.border = "1px solid #0E133E";
    var sliderunner = document.getElementById("series-wrapper").querySelector(".slide-runner");
    var mainUrl = "https://i.ytimg.com/vi/" + mainVidId + "/mqdefault.jpg";
    for (var i =0; i<4; i++){
        if(thumbnails[i] != mainUrl){
            var slide = document.createElement("img");
            sliderunner.appendChild(slide);
            slide.setAttribute("class", "mySlides");
            slide.setAttribute("src", thumbnails[i]);
            slide.setAttribute("title", vidTitles[i]);
            vidId = vidUUIDs[i];
            url = "http://127.0.0.1:8000/s/" + seriesUUID + "/watch#" + vidId;
            $(slide).click(function(){
                console.log(url);
                window.open(url);
            })

        } 
    }
    console.log("creating buttons");
    createButtons();
    carousel();
}

function showSeriesTitle(){
    var title = document.getElementById("series-wrapper").querySelector(".series-title");
    title.innerHTML = "More in this series";
    title.style.fontSize = "16px";
}

function createButtons(){
    var leftButton = document.getElementById("series-wrapper").querySelector(".button");
    leftButton.innerHTML = "<";
    leftButton.className = "nav-button";
    $(leftButton).click(function(){
        plusDivs(-1);
    });

    var rightButton = document.getElementById("series-wrapper").querySelector(".button");
    rightButton.innerHTML = ">";
    rightButton.className = "nav-button";
    $(rightButton).click(function(){
        plusDivs(1);
    });
}

var slideIndex = 1;

function plusDivs(n) {
    console.log("plusDivs is triggered");
    showDivs(slideIndex += n)

}

function showDivs(n) {
    console.log("executing showDivs");
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
    console.log("showDivs is done");
}


function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 5 seconds
}