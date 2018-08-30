'use strict';

document.body.style.border = "5px solid red"

browser.webRequest.onBeforeRequest.addListener(
	filterURL,
	{ types: ["script"] },
	["blocking"]
);


function filterURL(req){
	console.log("Blocking: " + req.url);
}

