function showSlideshowImages(thumbnails, vidUUIDs, seriesUUID, mainVidId, vidTitles){
    console.log("showing slideshow");
    var seriesWrapper = document.getElementById("series-wrapper");
    seriesWrapper.style.borderBottom = "0.5px solid rgb(181, 202, 241)";
    var sliderunner = document.getElementById("series-wrapper").querySelector(".slide-runner");
    var mainUrl = "https://i.ytimg.com/vi/" + mainVidId + "/mqdefault.jpg";
    for (var i =0; i<thumbnails.length; i++){
        if(thumbnails[i] != mainUrl){
            var slideHolder = document.createElement("div");
            sliderunner.appendChild(slideHolder);
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
            name.setAttribute("class", "series-name");
        } 
    }
    $('.mySlides').click(function(){
        var url = this.getAttribute("url");
        window.open(url);
    });
    console.log("creating buttons");
    //createButtons();
    //carousel();
}

function showSeriesTitle(){
    var title = document.getElementById("series-wrapper").querySelector(".series-title");
    title.innerHTML = "More in this series";
    title.style.fontSize = "16px";
    title.style.height = "17px";
    title.style.padding = "1px";
    title.style.textAlign = "center";
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
    var slides = document.getElementsByClassName("slide-holder");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    console.log("showDivs is done");
}


function carousel() {
    var i;
    var x = document.getElementsByClassName("slide-holder");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 5 seconds
}