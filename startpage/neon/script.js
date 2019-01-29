let prefix = '<p class="c_prefix">'+window.getComputedStyle(document.documentElement).getPropertyValue('--prefix').replace(/\'+/g, '')+'</p>';
let history = [];
let histIndex = 0;

let commands = {
    help: function() {
        out.put('USAGE:');
        out.put('&nbsp;&nbsp;&nbsp;&nbsp;[COMMAND] [ARGS]<br/>');
        out.put('COMMANDS:');
        out.put('&nbsp;&nbsp;&nbsp;&nbsp;help');
        out.put('&nbsp;&nbsp;&nbsp;&nbsp;clear');
        out.put('&nbsp;&nbsp;&nbsp;&nbsp;about');
        out.put('&nbsp;&nbsp;&nbsp;&nbsp;ifconfig');
    },
    clear: function() {
        $('#stdout').empty();
    },
    about: function() {
        out.put('<p class="t_white">A web-terminal concept made by <a href="https://github.com/runarsf" target="_blank">runarsf</a>.</p>');
    },
    ifconfig: function() {
    	$.getJSON('https://api.ipify.org/?format=json', function(data) {
            out.put(data.ip);
        });
    }
}

function parse(e) {
    stdin = document.getElementById('stdin');
    stdout = document.getElementById('stdout');

    histIndex = history.length;
    if(e.keyCode === 13) { // enter
        out.same();
        if(commands[stdin.value] == null) {
            out.put((stdin.value === '') ? '' : '<p class="t_brightRed">command not found: '+stdin.value+'</p>');
        } else {
            commands[stdin.value]();
        }
        if(stdin.value) {
            history[history.length] = stdin.value;
        }
        histIndex = history.length;
        console.log(history);
        document.getElementById('stdin').value = '';
    }
    if(e.keyCode === 38) { // up

    }
	if(e.keyCode === 40) { // down

    }
}

document.addEventListener('keydown', function (e) {
    // focus stdin
    stdin = document.getElementById('stdin');
    stdin.focus();
    // update scroll position
    var element = document.getElementById('stdout');
    element.scrollTop = element.scrollHeight;
    // ctrl+c check
    if (e.ctrlKey &&  e.code === 'KeyC') {
        out.same();
        document.getElementById('stdin').value = '';
    }
});

var out = {
    put: function(ln) {
        if(ln) { $('#stdout').append('<p>'+ln+'</p><br/>'); }
  	},
    same: function() {
        this.put(prefix+'<p class="t_brightWhite">'+document.getElementById('stdin').value+'</p>');
    }
}







var cookies = {
	set: function(cname, cvalue, cexpires, cpath) {
		(!cvalue) && (cvalue = null);
		(!cexpires) && (cexpires = 'Tue, 19 Jan 2038 03:14:07 UTC');
		(!cpath) && (cpath = '/');
		document.cookie = cname + '=' + cvalue + '; expires=' + cexpires + '; path=' + cpath;
	},
	get: function(cname) {
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
	},
	clear: function() {
	    var cookies = document.cookie.split(";");

	    for (var i = 0; i < cookies.length; i++) {
	        var cookie = cookies[i];
	        var eqPos = cookie.indexOf("=");
	        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	}
}
