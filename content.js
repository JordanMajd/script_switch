(function(){
'use strict';

browser.runtime.sendMessage('status-query')
	.then(onStatusReceived)
	.catch(console.error);

function onStatusReceived(isJsEnabled){
	if(isJsEnabled === false){
		var noScripts = document.getElementsByTagName('noscript');
		for(var i = 0; i < noScripts.length; i++){
			noScripts[i].outerHTML = noScripts[i].outerHTML.replace(/noscript/g, 'div');
		}
	}
}

})();
