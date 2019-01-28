// window.getComputedStyle(document.documentElement).getPropertyValue('--wallcolor')
let prefix = '<p class="c_prefix">'+window.getComputedStyle(document.documentElement).getPropertyValue('--prefix').replace(/\'+/g, '')+'</p>';

$(document).on('keypress', function(e) {
    stdin = document.getElementById('stdin');
    stdin.focus();
});

function parse(e) {
    stdin = document.getElementById('stdin');
    stdout = document.getElementById('stdout');

    if(e.keyCode === 13) {
        if(stdin.value === 'clear') {
            out.clear();
        }
        else if(stdin.value.trim() === '') { $('#stdout').append(prefix); }
        else {
            out.put('<p class="t_brightRed">command not found: '+stdin.value+'</p>')
        }
        out.put('<br/>');
        stdin.value = '';
    }
}

function updateScroll() {
    var element = document.getElementById('stdout');
    element.scrollTop = element.scrollHeight;
}

var out = {
    put: function(ln) {
        if(ln) { $('#stdout').append('<p>'+ln+'</p>'); }
  	},
	clear: function() {
		 $('#stdout').empty();
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
