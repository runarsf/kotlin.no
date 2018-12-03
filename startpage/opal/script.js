$(document).ready(
	function()
	{
		submit("clear");
	}
);

let history = [
    "",
    "this",
    "is",
    "an",
    "array"
];
let histIndex = 0;
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
        histIndex = 0;
        if(!(cmd.value.replace(/(\s*)/gm, "") === "")) {
            history[history.length] = cmd.value;
        }
        submit(cmd.value);
        cmd.value = "";

    } else if (e.keyCode === 38) { // up
        if(!(histIndex + 1 > history.length - 1)) {
            ++histIndex;
        }
        cmd.value = history[histIndex];
    } else if (e.keyCode === 40) { // down
        if(!(histIndex - 1 < 0 )) {
            --histIndex;
        }
        cmd.value = history[histIndex];
    } else if (e.keyCode === 27) { // esc
        cmd.value = "";
        histIndex = 0;
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
                        +"help<br/>"
                        +"history<br/>"
                        +"clear<br/>";
    } else if(arg === "history") {
        for(i = 1; i < history.length; i++) {
            newHist[i-1] = history[i];
            out.innerHTML = newHist.join("<br/>");
        }
    }


    //out.height = out.length;
}
