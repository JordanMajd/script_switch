(function(){

'use strict';

browser.webRequest.onBeforeRequest.addListener(
	filterURL,
	{ urls: ["<all_urls>", types: ["script"] },
	["blocking"]
);


function filterURL(req){
	console.log("Blocking: " + req.url);
}

})();
