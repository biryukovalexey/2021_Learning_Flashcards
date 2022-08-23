"use strict";
function isDev() {
	if (getCookie('mode') == 'dev') return true
	else return false;
}