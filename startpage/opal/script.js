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

    if (e.keyCode === 13) { // enter
        histIndex = history.length;
        if(!(cmd.value.replace(/(\s*)/gm, "") === "")) {
            history[history.length] = cmd.value;
            histIndex = history.length;
        }
        submit(cmd.value);
        cmd.value = "";
    } else if (e.keyCode === 38) { // up
        if(history != "") {
            cmd.value = history[histIndex-1];
        }
        if(!(histIndex - 1 <= 0)) {
            --histIndex;
        }
    } else if (e.keyCode === 40) { // down
        if(history != "") {
            cmd.value = history[histIndex];
        }
        if(!(histIndex > history.length - 1)) {
            histIndex++;
        } else {
            cmd.value = "";
        }
    } else if (e.keyCode === 27) { // esc
        cmd.value = "";
        histIndex = history.length;
    } else {
        console.log(e.keyCode);
    }
}

function submit(arg) {
    let cmd = document.getElementById('input-field');
    let out = document.getElementById("output-field");

    if(arg === "clear") {
        cmd.value = "";
        out.innerHTML = "";
    } else if(arg === "help") {
        out.innerHTML = "Available commands:<br/>"
                      + "help<br/>"
                      + "history<br/>"
                      + "clear<br/>"
                      + "echo<br/>";
    } else if(arg === "history") {
        out.innerHTML = history.join("<br/>");
    } else if(arg.startsWith("echo")) {
        out.innerHTML = arg.replace("echo", "");
    } else if(arg === "" ) {} else {
        out.innerHTML = "command not found: " + arg;
    }


    //out.height = out.length;
}
