// TODO: add wallpaper support
$(document).ready(
	function()
	{
		currentEngine();
		getNotes();
	}
);
let ngin;
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
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(cname) === 0) {
			return c.substring(cname.length, c.length);
		}
	}
	return '';
}

let enableKeybinds = true;
function setFocus(type) {
	if(type === "focused") {
		enableKeybinds = false;
	} else if (type === "unfocused") {
		enableKeybinds = true;
	} else {
		enableKeybinds = true;
	}
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
keyRegister(82, 82, reload);		// rr
keyRegister(71, 72, gitHub);		// gh
keyRegister(89, 84, youTube);		// gh
function gitHub() { window.open('https://github.com/') };
function youTube() { window.open('https://youtube.com/') };
function google() { window.open('https://google.com/') };
function translate() { window.open('https://translate.google.com/') };
function reload() { location.reload() };

function settings() {
	const x = document.getElementById('vr');
	const y = document.getElementById('settingsPanel');
	const t = document.getElementById('time');
	const list = document.getElementsByTagName("ul");
	if(list[0].style.height === "0px") {
		for(let i = 0; i <= list.length; i++) {
			t.style.marginLeft = "0px";
			x.style.visibility = "visible";
			x.style.height = "96%";
			list[i].style.visibility = "visible";
			list[i].style.height = "93%";
			list[i].style.marginTop = "15px";
			y.style.height = "0px";
			y.style.visibility = "hidden";
		}
	} else {
		for(let i = 0; i <= list.length; i++) {
			t.style.marginLeft = "860px";
			x.style.height = "0px";
			x.style.visibility = "hidden";
			list[i].style.height = "0px";
			list[i].style.marginTop = "-264px";
			list[i].style.visibility = "hidden";
			y.style.visibility = "visible";
			y.style.height = "93%";
		}
	}
}

let notes;
function notepad() {
	let np = document.getElementById('notepad');
	if(np.style.width === "400px") {
		np.style.width = "0px";
	} else {
		np.style.width = "400px";
	}
}
function saveNotes() {
	notes = document.getElementById('notearea');
	setCookie("notes", notes.value);
}
function getNotes() {
	notes = getCookie('notes');
	document.getElementById('notearea').value = notes;
}
//https://roopeshreddy.wordpress.com/tag/localstorage/

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	if (m < 10) { m = '0' + m };
	if (s < 10) { s = '0' + s };
	document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
	var t = setTimeout(startTime, 500);
}

var tld = ["com", "net", "org", "no", "hiphop", "coffee", "io"];
function search(e) {
	currentEngine();
	if (e.keyCode === 13) { // enter
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

	if (evt.keyCode === 32) { // space
		if(field.style.bottom <= 0) {
			field.value = '';
		}
		field.focus();
		field.style.bottom = '20%';
		text.style.bottom = '30%';
	}
	else if (evt.keyCode === 27) { // esc
		hideSearch();
	}
	else if (evt.keyCode === 38) {
		ngin = getCookie('engine');
		document.getElementById('engineInput').value = ngin;
	}
	else if (evt.keyCode === 40) {
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
	if(ev.keyCode === 13) {
		if(ngin === "") {
			if (confirm('Do you want to reset to the default search engine (Google)?')) {
				ngin = "https://google.com/#q=";
				alert("Set search engine to google")
			} else {
				ngin = getCookie('engine');
			}
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
