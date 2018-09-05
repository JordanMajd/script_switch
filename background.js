(function(){

'use strict';

var pattern = '<all_urls>';

var cspHeader = {
	name: 'Content-Security-Policy',
	value: "script-src 'none';"
};

browser.webRequest.onHeadersReceived.addListener(
	setCSPHeader,
	{ urls: [pattern] },
	['blocking', 'responseHeaders']
);


function setCSPHeader(res){
	console.log("Setting headers...");
	res.responseHeaders.push(cspHeader);
	return { responseHeaders: res.responseHeaders };
}

})();
