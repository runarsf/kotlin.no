// TODO: add wallpaper support
// TODO: convert all links to linkIt()
$(document).ready(
	function()
	{
		currentEngine();
		currentMode();
		currentBox();
	}
);

let enableKeybinds = true;
function setFocus() {
	enableKeybinds = false;
	return enableKeybinds;
}
function setUnfocus() {
	enableKeybinds = true;
	return enableKeybinds;
}
function keyRegister(keyCode1, keyCode2, runFunction) {
	let id = keyCode1+'.'+keyCode2+'.'+Math.random()*100;
	this[id] = null;
	document.addEventListener('keydown', event => {
		console.log('temp: enableKeybinds; '+enableKeybinds);
		if(enableKeybinds === true) {
			if(event.keyCode === keyCode1 || event.keyCode === keyCode2) {
				if(keyCode2 === null) {
					runFunction();
					this[id] = null;
				}
				else if(event.keyCode === keyCode2) {
					if(this[id] === keyCode1) {
							runFunction();
							this[id] = null;
					}
					else {
						this[id] = event.keyCode;
					}
				}
			}
			this[id] = event.keyCode;
		}
	});
}
keyRegister(71, 71, google);		// gg
keyRegister(84, 82, translate);		// tr
keyRegister(16, 71, selfDashboard);	// Shift g
keyRegister(71, 65, dashboard);		// ga
keyRegister(82, 82, reload);		// rr
keyRegister(112, null, helpMe);		// F1
keyRegister(71, 76, gitLab);		// gl
keyRegister(71, 72, gitHub);		// gh
keyRegister(82, 87, randomWord)		// rw
function gitHub() { linkIt('https://github.com/') };
function gitLab() {	linkIt('https://gitlab.kantega.no/') };
function selfDashboard() { linkIt('https://jira.kantega.no/secure/RapidBoard.jspa?rapidView=100&quickFilter=635') };
function dashboard() { linkIt('https://jira.kantega.no/secure/RapidBoard.jspa?rapidView=100') };
function google() { linkIt('https://google.com/') };
function translate() { linkIt('https://translate.google.com/') };
function randomWord() { linkIt('https://randomwordgenerator.com/') };
function reload() { location.reload() };


visibility = 'visible';
function helpMe() {
	document.onHelp = function () { return (false); } // remove default help(f1) function for document
	window.onHelp = function () { return (false); } // remove default help(f1) function for window
	document.getElementById('info').style.visibility = visibility;
	document.getElementById('bgblur').style.visibility = visibility;
	if(visibility === 'visible') {
		visibility = 'hidden';
	} else if(visibility === 'hidden') {
		visibility = 'visible';
	}
}

function linkIt(url) {
	redir = getCookie('redirect');
	if(redir !== "true" || redir !== "false") {
		redir = "false";
	}
	if(url === "") {
		alert("Missing URL");
	}
	else if(redir === "true") {
		window.open(url, "_self");
	}
	else if(redir === "false") {
		window.open(url);
	}
}

function setBox() {
	var checkBox = document.getElementById("selfOpen");

	if(checkBox.checked === true) {
		setCookie('redirect', "true");
	}
	else {
		setCookie('redirect', "false");
	}
}
function currentBox() {
	dirc = getCookie('redirect');
	if(dirc === "true") {
		document.getElementById('selfOpen').checked = true;
		console.log("check");
	} else {
		document.getElementById('selfOpen').checked = false;
		console.log("uncheck");
	}
}


function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
	var t = setTimeout(startTime, 500);
}
function checkTime(i) {
	if (i < 10) { i = '0' + i }; // add zero in front of numbers < 10
	return i;
}


function importFile(file) {
	if(file.endsWith('css')) {
		$('head').append('<link rel="stylesheet" type="text/css" media="screen" href="'+file+'" />');
	}
	if(file.endsWith('js')) {
		$('head').append('<script type="text/javascript" src="'+file+'"></script>');
	}
}


function favesJson() {
	$(function(){
		$.getJSON('content.json', function(data) {
			console.log('jQuery: successfully imported json');
			$.each(data, function(i, content) {
				// parse = content.join().replace(/https:\/\//g , '<a href=\'https://').replace(/,/g , '\'>'+'asd'+'</a><br/>')
				parse = content.join('<br />');
				$('#faves ul').append('<li>'+parse+'</li>');
			});
		}).error(function(){
			console.log('jQuery: json error');
		});
	});
}

function favAdd() {
	title = document.getElementById('inpTITLE').value;
	url = document.getElementById('inpURL').value;
	if(title === '' || url === '') {
		alert('Title or URL cannot be blank');
	}
	if(url.startsWith('http://') || url.startsWith('https://') && url.includes('.')) {
		$('#faves ul').append('<li><a onclick=\'linkIt("'+url+'")\'>'+title+'</a></li>');
		document.getElementById('inpTITLE').value = '';
		document.getElementById('inpURL').value = '';
		xi = document.querySelectorAll('#faves ul li').length;
		if(xi >= 1) {
			document.getElementById('faves').style.display = 'initial';
		}
		else {
			document.getElementById('faves').style.display = 'none';
		}
	}
	else {
		alert('URL has to start with http(s)://')
	}
}

function favBox() {
	box = document.getElementById('inputbox');
	if(box.style.visibility === 'visible') {
		box.style.visibility = 'hidden';
	} else {
		box.style.visibility = 'visible';
	}
}

var tld = ["com", "net", "org", "no", "hiphop", "coffee"];
function search(e) {
	currentEngine();
	if (e.keyCode == 13) { // enter
		let val = document.getElementById('search-field').value;
		let strap = val.trim();
		var pop = val.split('.').pop();

		if (strap.startsWith('!r')) {
			window.open('https://reddit.com/r/' + val.replace('!r', '').replace(' ', '').trim());
		} else if (strap.startsWith('!g')) {
			window.open(ngin + val.replace('!g', '').replace(' ', '').trim());
		} else if (val.startsWith('https://') || val.startsWith('http://')) {
			window.open(val);
		} else if(tld.includes(pop)) {
			window.open('https://'+val.trim());
		} else {
			window.open(ngin + val.trim());
		}
		document.getElementById('search-field').value = '';
		hideSearch();
	}
}
document.addEventListener('keydown', evt => {
	let field = document.getElementById('search-field');
	let text = document.getElementById('search-text');
	
	if (evt.keyCode == 32) { // space
		if(field.style.bottom <= 0) {
			field.value = '';
		}
		field.focus();
		field.style.bottom = '20%';
		text.style.bottom = '30%';
		visblr = document.getElementById('info').style.visibility;
		if(visblr === "visible") {
			helpMe();
		}
	}
	else if (evt.keyCode == 27) { // esc
		hideSearch();
		visblr = document.getElementById('info').style.visibility;
		if(visblr === "visible") {
			helpMe();
		}
	}
	else if (evt.keyCode == 38) {
		ngin = getCookie('engine');
		document.getElementById('engineInput').value = ngin;
	}
	else if (evt.keyCode == 40) {
		document.getElementById('engineInput').value = "";
	}
});
function hideSearch() {
	let field = document.getElementById('search-field');
	let text = document.getElementById('search-text');
	field.value = '';
	field.blur();
	field.style.bottom = '-20%';
	text.style.bottom = '-10%';
}

function setCookie(cname, cvalue, cexpires, cpath) {
	if(!cvalue) {
		var cvalue = null;
	}
	if(!cexpires) {
		var cexpires = 'Tue, 19 Jan 2038 03:14:07 UTC';
	}
	if(!cpath) {
		var cpath = '/';
	}
	document.cookie = cname + '=' + cvalue + '; expires=' + cexpires + '; path=' + cpath;
}
function getCookie(cname) {
	var cname = cname + '=';
	var dcookie = decodeURIComponent(document.cookie);
	var scookie = dcookie.split(';');
	for(var i = 0; i < scookie.length; i++) {
		var c = scookie[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(cname) == 0) {
			return c.substring(cname.length, c.length);
		}
	}
	return '';
}







function colorScheme(bgColor, textColor, rulerColor, searchColor) {
	document.getElementById('body').style.backgroundColor = bgColor;
	document.getElementById('html').style.backgroundColor = bgColor;
	document.getElementById('body').style.color = textColor;
	document.getElementById('html').style.color = textColor;

	document.getElementById('info').style.backgroundColor = bgColor;
	document.getElementById('binds').style.color = textColor;
	document.getElementById('infoTitle').style.color = textColor;
	document.getElementById('infoH1').style.color = textColor;
	document.getElementById('infoH2').style.color = textColor;
	document.getElementById('infoHR1').style.backgroundColor = rulerColor;
	document.getElementById('infoHR2').style.backgroundColor = rulerColor;
	document.getElementById('infoHR3').style.backgroundColor = rulerColor;
	document.getElementById('search-field').style.backgroundColor = searchColor;
	document.getElementById('search-field').style.color = bgColor;
	document.getElementById('search-text').style.color = searchColor;
}
function darkMode() {
	setCookie('colorMode', 'dark');
	colorScheme('#222', '#FFF', '#5a5a5a', '#dedede');
}
function lightMode() {
	setCookie('colorMode', 'light');
	colorScheme('#FFF', '#222', '#bebebe', '#272727');
}
function toggleMode() {
	var cm = getCookie('colorMode');
	if (cm === 'light') {
		darkMode();
	} else {
		lightMode();
	}
}
function currentMode() {
	var cm = getCookie('colorMode');
	if (cm === 'light') {
		lightMode();
	} else {
		darkMode();
	}
	return cm;
}

let ngin;
function currentEngine() {
	ngin = getCookie('engine');
	if(ngin === "") {
		ngin = "https://google.com/#q=";
	}
	document.getElementById('engineInput').placeholder = ngin;
	document.getElementById('engineInput').value = "";
	return ngin;
}
function setEngine(ev) {
	ngin = document.getElementById('engineInput').value;
	if(ev.keyCode == 13) {
		if(ngin === "") {
			ngin = "https://google.com/#q=";
			alert("Set search engine to google")
		} else if(ngin.startsWith("https://") || ngin.startsWith("http://")) {
			alert("Set search engine to "+ngin);
		} else {
			ngin = "https://"+ngin;
			alert(ngin);
		}
		setCookie("engine", ngin);
		document.getElementById('engineInput').placeholder = ngin;
		document.getElementById('engineInput').value = "";
	}
}