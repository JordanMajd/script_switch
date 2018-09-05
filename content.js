(function(){
'use strict';

var noScripts = document.getElementsByTagName('noscript');
for(var i = 0; i < noScripts.length; i++){
	noScripts[i].outerHTML = 'div';
}

})();
