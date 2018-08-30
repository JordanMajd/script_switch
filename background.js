(function(){

'use strict';

browser.webRequest.onBeforeRequest.addListener(
	filterURL,
	{ types: ["script"] },
	["blocking"]
);


function filterURL(req){
	console.log("Blocking: " + req.url);
}

})();
