'use strict';

var scripts = document.getElementsByTagName("script");
for(var i = 0; i < scripts.length; i++){
	scripts[i].outerHTML = "";
}

var noScripts = document.getElementsByTagName("noscript");
for(var i = 0; i < scripts.length; i++){
	noScripts[i].outerHTML = "div";
}

