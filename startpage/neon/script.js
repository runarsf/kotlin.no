$(document).ready(
	function()
	{
        history = cookies.get('history');
        history = '\[\"'+history.replace(/\,+/g, '\", \"')+'\"\]'
        history = JSON.parse(history);
	}
);

let prefix = '<p class="c_prefix">'+window.getComputedStyle(document.documentElement).getPropertyValue('--prefix').replace(/[\'\"]+/g, '')+'</p>';
let secondPrefix = '<p class="c_prefix">'+window.getComputedStyle(document.documentElement).getPropertyValue('--secondPrefix').replace(/[\'\"]+/g, '')+'</p>';
let currentPrefix = prefix;
let history = [];
let yrotsih = [];
let histIndex = 0;
let evalMode = false;

let tronder = {
	e: 'er',
	æ: 'jeg',
	d: 'det',
	de: 'det',
	dem: 'de',
	koss: 'hvordan',
	kjem: 'kommer',
	t: 'til',
	te: 'til',
	vettu: 'vet du',
	vunne: 'vunnet',
	me: 'med',
	veit: 'vet',
	dæ: 'deg',
	va: 'var',
	te: 'til',
	no: 'nå',
	nån: 'noen',
	nånn: 'noen',
	ganga: 'ganger'
}

let commands = {
    help: {
        function() {
            out.put('<b>USAGE:</b>');
            out.put('&nbsp;&nbsp;&nbsp;&nbsp;[COMMAND] [ARGS]');
            out.put('<br/><b>COMMANDS:</b>');
            var cmds = Object.keys(commands);
            cmds.forEach(function(element) {
                if(!(eval('commands.'+element+'.hidden'))) out.put('&nbsp;&nbsp;&nbsp;&nbsp;'+element);
            });
        },
        description: 'Display help reference.',
        synopsis: '',
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
	trønder: {
		function(word) {
			if(word === '--list' || word === '-l') {
				var words = Object.keys(tronder);
	            words.forEach(function(element) {
					if(word === '--list') {
	                	out.put(element+' -- '+eval('tronder.'+element));
					} else {
						out.put(element);
					}
	            });
			} else {
				out.put(eval('tronder.'+word));
			}
		},
		description: 'Look up trønder words into bokmål.',
		synopsis: '[word] [-l] [--list]'
	},
	tronder: {
		function(word) {
			try {
				eval('commands.trønder.function(word)');
			}
			catch(err) {
				out.put(err.message);
			}
		},
		description: 'Alias for trønder.',
		synopsis: '[word] [-l | --list]'
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
    animate: {
        function() {
            if(document.getElementById('bgblur').className.includes('bgNoGradientAnimation')) {
                $('#bgblur').addClass('bgGradientAnimation');
                $('#bgblur').removeClass('bgNoGradientAnimation');
            } else {
                $('#bgblur').removeClass('bgGradientAnimation');
                $('#bgblur').addClass('bgNoGradientAnimation');
            }
        },
        description: 'Animate background.',
        synopsis: ''
    },
    eval: {
        function(forceMode) {
            if(forceMode == false) {
                evalMode = false;
                currentPrefix = prefix;
                document.getElementById('prefix').innerHTML = prefix;
            } else if(forceMode == true) {
                evalMode = true;
                currentPrefix = secondPrefix;
                document.getElementById('prefix').innerHTML = secondPrefix;
            } else if(document.getElementById('prefix').innerHTML === secondPrefix) {
                eval('this.function(false)');
            } else {
                eval('this.function(true)');
            }
        },
        description: 'Toggle eval mode. This lets you run js-commands directly in the web terminal.',
        synopsis: ''
    },
    ping: {
        function(ip) {
            if(ip) {
            } else {
                out.put('Could not ping remote URL');
            }
        },
        description: 'Ping a server and return time in ms. Experimental.',
        synopsis: '[server]',
        hidden: true
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
        function(mod) {
            if(mod === 'clear') {
                history = [];
                cookies.delete('history');
            } else {
                out.put(history.join('<br/>'));
            }
        },
        description: 'Display recent history.',
        synopsis: '[clear]'
    },
    inspect: {
        function(func) {
            try {
                out.put(eval('commands.'+func+'.function').toString().replace(/\<+/g, '&#60;').replace(/\>+/g, '&#62;').replace(/\&nbsp;+/g, '&#38;nbsp;').replace(/\n+/g, '<br/>'));
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
            // Opera 8.0+
            let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            // Firefox 1.0+
            let isFirefox = typeof InstallTrigger !== 'undefined';
            // Safari 3.0+ "[object HTMLElementConstructor]"
            let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
            // Internet Explorer 6-11
            let isIE = /*@cc_on!@*/false || !!document.documentMode;
            // Edge 20+
            let isEdge = !isIE && !!window.StyleMedia;
            // Chrome 1+
            let isChrome = !!window.chrome && !!window.chrome.webstore;
            // Blink engine detection
            let isBlink = (isChrome || isOpera) && !!window.CSS;
            out.put((isOpera) ? 'opera' : (isFirefox) ? 'firefox' : (isSafari) ? 'safari' : (isIE) ? 'IE' : (isEdge) ? 'edge' : (isChrome) ? 'chrome' : (isBlink) ? 'blink' : 'toaster')
        },
        description: 'System information',
        synopsis: '',
    },
    env: {
        function() {
            try {
                var declaration = document.styleSheets[0].cssRules[0];
                var allVar = declaration.style.cssText.split(";");

                var result = {}
                for (var i = 0; i < allVar.length; i++) {
                  var a = allVar[i].split(':');
                  if(a[0] !== "")
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

        if(evalMode == true && !(args[0] == 'eval')) {
            try {
                out.put(eval(stdin.value));
            }
            catch(err) {
                out.put(err.message);
            }
        } else if(commands[args[0]] == null) {
            out.put((stdin.value === '') ? '' : '<p class="t_brightRed">command not found: '+stdin.value+'</p>');
        } else {
            commands[args[0]].function(args[1]);
        }
        if(stdin.value && !(args[0] == 'history' && args[1] == 'clear')) {
            history[history.length] = stdin.value;
        }

        stdin.value = '';
        cookies.set('history', eval(JSON.stringify(history)));
    }
    if(e.keyCode === 38) { // up
        yrotsih = history.slice().reverse();
        histIndex = (yrotsih[histIndex+1] == undefined) ? histIndex : histIndex + 1;
        stdin.value = (yrotsih[histIndex] == undefined) ? '' : yrotsih[histIndex];
    }
	if(e.keyCode === 40) { // down
        yrotsih = history.slice().reverse();
        histIndex = (yrotsih[histIndex-1] == undefined) ? -1 : histIndex - 1;
        stdin.value = (yrotsih[histIndex] == undefined) ? '' : yrotsih[histIndex];
    }
}

document.addEventListener('keydown', function (e) {
    // focus stdin
    //stdin = document.getElementById('stdin');
    //stdin.focus();
    if(e.keyCode === 45) stdin.focus();
    // ctrl+d check
    if(e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        if($('#stdin').is(':focus')) {
            out.same();
            commands.eval.function(false);
            document.getElementById('stdin').value = '';
        }
    }
    // ctrl+c check
    if(e.ctrlKey && e.key === 'c') {
        if($('#stdin').is(':focus')) {
            e.preventDefault();
            out.same('^C');
            document.getElementById('stdin').value = '';
        }
    }
    // update scroll position
    var element = document.getElementById('stdout');
    element.scrollTop = element.scrollHeight;
});

var out = {
    put: function(ln) {
        if(ln) { $('#stdout').append('<p>'+ln+'</p><br/>'); }
  	},
    same: function(append) {
        if(append == undefined) {
            append = '';
        }
        histIndex = -1;
        this.put(currentPrefix+'<p class="t_brightWhite">'+document.getElementById('stdin').value+append+'</p>');
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
			if(c.indexOf(cname) == 0) {
				return c.substring(cname.length, c.length);
			}
		}
		return '';
	},
    delete: function(cname) {
        document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
	purge: function() {
	    var cookies = document.cookie.split(";");

	    for (var i = 0; i < cookies.length; i++) {
	        var cookie = cookies[i];
	        var eqPos = cookie.indexOf("=");
	        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	}
}
