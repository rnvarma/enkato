var urls = window.location.href;
console.log("url: " + urls);

console.log("background page is working");

var tabUrl;
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function(tab){
		console.log(tab.url);
		tabUrl = tab.url;
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		if (activeInfo.tabId==tabId){
			console.log(changeInfo.url);
			if(changeInfo.url!= null){
				console.log("needs to reload");
				chrome.tabs.sendMessage(activeInfo.tabId, {"newUrl": changeInfo.url});
				console.log("sent to content");
			}
		}
	});
})
