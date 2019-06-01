(function(){

'use strict';

var enabled = true;

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

function enableJS(){

	console.log("Enabling javascript");

	browser.browserAction.setIcon({path:onIcon});
	browser.browserAction.setTitle({title: "Script Switch: JS enabled"});
	browser.webRequest.onHeadersReceived.removeListener(setCSPHeader);
	browser.tabs.query({currentWindow: true})
		.then(reloadTabs);
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
	browser.tabs.query({currentWindow: true})
		.then(reloadTabs);
}

function reloadTabs(tabs){
	for(let tab of tabs){
		browser.tabs.reload(tab.id);
	}
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
