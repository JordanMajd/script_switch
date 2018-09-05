(function(){

'use strict';

var enabled = true;

var pattern = '<all_urls>';

var cspHeader = {
	name: 'Content-Security-Policy',
	value: "script-src 'none';"
};

var onIcon = {
	48: "icons/on.svg",
	96: "icons/on.svg"
};

var offIcon = {
	48: "icons/off.svg",
	96: "icons/off.svg"
};


browser.browserAction.onClicked.addListener(toggleScript);
browser.commands.onCommand.addListener(toggleScript);

function enableJS(){

	console.log("Enabling javascript");

	browser.browserAction.setIcon({path:onIcon});
	browser.browserAction.setTitle({title: "Script Switch: JS enabled"});

	browser.webRequest.onHeadersReceived.removeListener(setCSPHeader);
}


function disableJS(){

	console.log("Disabling javascript");

	browser.browserAction.setIcon({path:offIcon});
	browser.browserAction.setTitle({title: "Script Switch: JS disabled"});

	browser.webRequest.onHeadersReceived.addListener(
		setCSPHeader,
		{ urls: [pattern] },
		['blocking', 'responseHeaders']
	);
}


function setCSPHeader(res){

	console.log("Overriding Content Security Policy...");

	res.responseHeaders.push(cspHeader);

	return { responseHeaders: res.responseHeaders };
}


function toggleScript(){

	enabled = !enabled;

	if(enabled){
		enableJS();
	} else {
		disableJS();
	}

	browser.tabs.reload({bypassCache:true});
}

})();
