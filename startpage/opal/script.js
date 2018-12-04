$(document).ready(
	function()
	{
		submit("clear");
	}
);

let history = [

];
let histIndex = history.length;
let newHist = [];
let customCommand = false;
let customEngine = "";
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

function parse(e) {
    let cmd = document.getElementById('input-field');

	if(customCommand && e.keyCode === 13) {
		window.open(customEngine+cmd.value.replace(/(\s+)/gm, "+"));
		prefixFormat("default");
	}

    else if (e.keyCode === 13) { // enter
        histIndex = history.length;
        if(!(cmd.value.replace(/(\s*)/gm, "") === "")) {
            history[history.length] = cmd.value;
            histIndex = history.length;
            submit(cmd.value);
        }
        cmd.value = "";
	} else if (e.keyCode === 27) { // esc
		if(cmd.value === "") { cmd.blur(); }
        cmd.value = "";
        histIndex = history.length;
    }

	if(cmd.value.startsWith("g:")) {
		prefixFormat("g");
		return customEngine = "https://google.com/#q=";
	} else if(cmd.value.startsWith("d:") || cmd.value.startsWith("ddg:")) {
		prefixFormat("d");
		return customEngine = "https://duckduckgo.com/?q=";
	} else if(cmd.value.startsWith("y:")) {
		prefixFormat("y");
		return customEngine = "https://www.youtube.com/results?search_query=";
	}
	else if(/^$/.test(cmd.value)) { prefixFormat("default"); }

	if (e.keyCode === 38) { // up
        if(history != "") {
            cmd.value = history[histIndex-1];
        }
        if(!(histIndex - 1 <= 0)) {
            --histIndex;
        }
    }
	if (e.keyCode === 40) { // down
        if(history != "") {
            cmd.value = history[histIndex];
        }
        if(!(histIndex > history.length - 1)) {
            histIndex++;
        } else {
            cmd.value = "";
        }
    }
}

function man(args) {
    let out = document.getElementById('output-field');
    out.innerHTML = "What manual page do you want?";
    out.innerHTML = "Command: man<br/>"
                  + "Description: an interface to the on-line reference manuals<br/>"
                  + "Usage: man [command]"
}

function submit(arg) {
    let cmd = document.getElementById('input-field');
    let out = document.getElementById('output-field');
    out.style.color = "white";

    switch(arg) {
        case 'cls':
        case 'clear':
            cmd.value = "";
            out.innerHTML = "";
            break;
        case 'commands':
        case 'help':
            out.style.color = "#8CBCBB";
            out.style.fontWeight = "bold";
            out.innerHTML = "Available commands:<br/>"
                          + "&emsp; help<br/>"
                          + "&emsp; history<br/>"
                          + "&emsp; clear<br/>"
                          + "&emsp; echo<br/>"
                          + "&emsp; man"
            break;
        case 'history':
            out.innerHTML = history.join("<br/>");
            break;
        case 'echo':
            out.innerHTML = arg.replace("echo", "");
            break;
        case 'time':
        case 'man':
            man(arg);
            break;
        default:
            out.style.color = "#BF616A";
            out.innerHTML = "command not found: " + arg;
    }
}

function prefixFormat(value) {
	let pre = document.getElementById("prefix");
	let inf = document.getElementById('input-field');

	if(value === "default") {
		pre.className = "letter";
		pre.innerHTML = "»";
		inf.value = "";
		return customCommand = false;
	} else {
		pre.className = "kbd";
		pre.innerHTML = value;
		inf.value = inf.value.replace((value+":"), "");
		return customCommand = true;
	}
}
