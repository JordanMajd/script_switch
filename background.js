(function(){

'use strict';

var pattern = '<all_urls>';
var settings = ['allow', 'block']

chrome.contentSettings.javascript.set({
	'primaryPattern': pattern,
	'setting': settings[1];
});

browser.webRequest.onBeforeRequest.addListener(
	filterURL,
	{ urls: [pattern], types: ['script'] },
	['blocking']
);


function filterURL(req){
	console.log('Blocking: ' + req.url);
}

})();
