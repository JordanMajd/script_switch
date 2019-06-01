(function(){
'use strict';

var isJsEnabled = true;

var pattern = '<all_urls>';

var cspHeader = {
	name: 'Content-Security-Policy',
	value: "script-src 'none';"
};

var onIcon = {
	48: "icons/on.png",
	96: "icons/on.png"
};

var offIcon = {
	48: "icons/off.png",
	96: "icons/off.png"
};


browser.browserAction.onClicked.addListener(toggleScript);
browser.commands.onCommand.addListener(toggleScript);
browser.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request  === 'status-query')
	sendResponse(isJsEnabled);
});


function enableJS(){
	browser.browserAction.setIcon({path:onIcon});
	browser.browserAction.setTitle({title: "Script Switch: JS enabled"});
	browser.webRequest.onHeadersReceived.removeListener(setCSPHeader);
}


function disableJS(){
	browser.browserAction.setIcon({path:offIcon});
	browser.browserAction.setTitle({title: "Script Switch: JS disabled"});

	browser.webRequest.onHeadersReceived.addListener(
		setCSPHeader,
		{ urls: [pattern] },
		['blocking', 'responseHeaders']
	);
}


function reloadTabs(tabs){
	for(let tab of tabs){
		browser.tabs.reload(tab.id);
	}
}


function setCSPHeader(res){
	res.responseHeaders.push(cspHeader);
	return { responseHeaders: res.responseHeaders };
}


function toggleScript(){

	isJsEnabled = !isJsEnabled;

	if(isJsEnabled){
		enableJS();
	} else {
		disableJS();
	}

	browser.tabs.query({currentWindow: true})
		.then(reloadTabs);
}

})();
