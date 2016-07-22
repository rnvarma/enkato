function showSlideshowImages(thumbnails, vidUUIDs, seriesId){
	console.log("showing slideshow");
	var sliderunner = document.getElementById("series-wrapper").querySelector(".slide-runner");
	for (var i =0; i<4; i++){
		var slide = document.createElement("img");
		sliderunner.appendChild(slide);
		slide.setAttribute("class", "mySlides");
		slide.setAttribute("src", thumbnails[i]);
		vidId = vidUUIDs[i];
		url = "http://127.0.0.1:8000/s/" + seriesId + "/watch#" + vidId
		console.log(url);
		$(slide).click(function(){
			vidId = vidUUIDs[i];
			url = "http://127.0.0.1:8000/s/" + seriesId + "/watch#" + vidId
			window.open(url);
		})
	}
	var buttons = document.getElementById("series-wrapper").querySelectorAll(".nav-button");
	buttons[0].innerHTML = "<";
	buttons[1].innerHTML=">";
	carousel();
}
var slideIndex = 1;
var myIndex =0;

function plusDivs(n) {
  showDivs(slideIndex += n)
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}


function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 5 seconds
}