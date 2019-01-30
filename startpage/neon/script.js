let prefix = '<p class="c_prefix">'+window.getComputedStyle(document.documentElement).getPropertyValue('--prefix').replace(/[\'\"]+/g, '')+'</p>';
let history = [];
let yrotsih = [];
let histIndex = 0;

// https://stackoverflow.com/questions/208016/how-to-list-the-properties-of-a-javascript-object
let commands = {
    help: {
        function() {
            out.put('USAGE:');
            out.put('&nbsp;&nbsp;&nbsp;&nbsp;[COMMAND] [ARGS]<br/>');
            out.put('COMMANDS:');
            var cmds = Object.keys(commands);
            cmds.forEach(function(element) {
                out.put('&nbsp;&nbsp;&nbsp;&nbsp;'+element);
            });
        },
        description: 'Display help reference.',
        synopsis: ''
    },
    man: {
        function(cmd) {
            if(cmd == undefined) {
                out.put('What manual page do you want?');
                return;
            }
            try {
                eval('commands.'+cmd+'.description');
                eval('commands.'+cmd+'.synopsis');
                out.put('<b>COMMAND:</b>');
                out.put('&nbsp;&nbsp;&nbsp;&nbsp;'+cmd);
                out.put('<br/><b>DESCRIPTION:</b>');
                out.put('&nbsp;&nbsp;&nbsp;&nbsp;'+eval('commands.'+cmd+'.description'));
                out.put('<br/><b>SYNOPSIS:</b>');
                out.put('&nbsp;&nbsp;&nbsp;&nbsp;<b>'+cmd+'</b> '+eval('commands.'+cmd+'.synopsis'));
            }
            catch(err) {
                out.put('No manual entry for '+cmd);
                console.log(err.message);
            }
        },
        description: 'An interface to the on-line reference manuals.',
        synopsis: '[command]'
    },
    clear: {
        function() {
            $('#stdout').empty();
        },
        description: 'Clear output.',
        synopsis: ''
    },
    about: {
        function() {
            out.put('<p class="t_white">A web-terminal concept made by <a href="https://github.com/runarsf" target="_blank">runarsf</a>.</p>');
        },
        description: 'Website information.',
        synopsis: ''
    },
    ifconfig: {
        function() {
            $.getJSON('https://api.ipify.org/?format=json', function(data) {
                out.put(data.ip);
            });
        },
        description: 'Get ip-adress.',
        synopsis: ''
    },
    history: {
        function() {
            out.put(history.join('<br/>'));
        },
        description: 'Display recent history.',
        synopsis: ''
    },
    inspect: {
        function(func) {
            try {
                out.put(eval('commands.'+func+'.function').toString().replace(/\n+/g, '<br/>'));
            }
            catch(err) {
                out.put('No function named '+func);
            }
        },
        description: 'Inspect the source-code of a command.',
        synopsis: '[function]'
    },
    fetch: {
        function() {
            out.put('Not implemented yet.');
        },
        description: 'System information',
        synopsis: ''
    },
    env: {
        function() {
            try {
                var declaration = document.styleSheets[0].cssRules[0];
                var allVar = declaration.style.cssText.split(";");

                var result = {}
                for (var i = 0; i < allVar.length; i++) {
                  var a = allVar[i].split(':');
                  if (a[0] !== "")
                    result[a[0].trim()] = a[1].trim();
                }

                console.log(result);
                var keys = Object.keys(result);
                console.log(keys);
            }
            catch(err) {
              out.put('Error: <code>'+err.message+'</code>');
            }
        },
        description: 'List CSS environment variables.',
        synopsis: ''
    },
    logout: {
        function() {
            async function exit() {
                out.put('Goodbye...');
                await sleep(1500);
                document.getElementById('stdinplaceholder').style.visibility = 'hidden';
            }
            exit();
        },
        description: 'Log out of shell and exit page.',
        synopsis: ''
    }
}

function parse(e) {
    stdin = document.getElementById('stdin');
    stdout = document.getElementById('stdout');

    if(e.keyCode === 13) { // enter
        var args = stdin.value.split(/\s+/);
        var args = stdin.value.trim().split(/\s+/);
        var args = stdin.value.replace(/^\s+|\s+$/g, '').split(/\s+/);

        out.same();
        if(commands[args[0]] == null) {
            out.put((stdin.value === '') ? '' : '<p class="t_brightRed">command not found: '+stdin.value+'</p>');
        } else {
            commands[args[0]].function(args[1]);
        }
        if(stdin.value) {
            history[history.length] = stdin.value;
        }
        histIndex = 0;
        document.getElementById('stdin').value = '';
    }
    if(e.keyCode === 38) { // up
        histIndex++;
        yrotsih = history.slice().reverse();
        console.log(yrotsih[histIndex]);
    }
	if(e.keyCode === 40) { // down
        histIndex--;
        yrotsih = history.slice().reverse();
        console.log(yrotsih[histIndex]);
    }
}

document.addEventListener('keydown', function (e) {
    // focus stdin
    //stdin = document.getElementById('stdin');
    //stdin.focus();
    // update scroll position
    var element = document.getElementById('stdout');
    element.scrollTop = element.scrollHeight;
    // ctrl+c check
    if (e.ctrlKey &&  e.code === 'KeyC') {
        if($('#stdin').is(':focus')) {
            out.same(' ^C');
            document.getElementById('stdin').value = '';
        }
    }
});

var out = {
    put: function(ln) {
        if(ln) { $('#stdout').append('<p>'+ln+'</p><br/>'); }
  	},
    same: function(append) {
        if(append == undefined) {
            append = '';
        }
        this.put(prefix+'<p class="t_brightWhite">'+document.getElementById('stdin').value+append+'</p>');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
