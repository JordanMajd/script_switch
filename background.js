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
	['blocking', 'requestHeaders']
);


function setCSPHeader(req){
	req.responseHeaders.push(cspHeader);
}

})();
