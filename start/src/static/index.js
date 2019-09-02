$(document).ready(function () {
    loadLinks();
    $(document).keydown(function (event) { trigger.binds(event) });
    $('#search-input').keyup(function () { trigger.search() });
});


/**
 * Load links from JSON file
 */
let catergoryClass;
function loadLinks() {
    $(function () {
        $.getJSON('/static/links.json', function (data) {
            $.each(data.links, function (i, link) {
                
                catergoryClass = link.category.replace('/', '_').replace(' ', '_');
                if (!(link.url)) link.url = "javascript: void(0);' style='cursor:var(--cursor);" // if an url isn't set, style the cursor and remove click events
                $('#box-area').append("<ol class='" + catergoryClass + " list-area'><a href='" + link.url + "' class='list-header'>" + link.category + "</a></ol>");
                
                $.each(link.content, function (i, cont) {
                    if (cont.script) {
                        appendString = "<li class='list-item'><a onclick='" + cont.script + "'>" + cont.title + "</a></li>"
                        $('.' + catergoryClass).append(appendString);
                    } else if (cont.title) { // is title defined in content
                        $('.' + catergoryClass).append("<li class='list-item'><a href='" + cont.url + "'>" + cont.title + "</a></li>");
                    }
                });

            });
        }).error(function (error) {
            console.log(error);
        });
    });
}

/**
 * Clock
 */
var time = {
    start: function () {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = time.check(m);
        s = time.check(s);
        document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
        var t = setTimeout(time.start, 500);
    },
    check: function (i) {
        if (i < 10) { i = '0' + i }; // add zero in front of numbers < 10
        return i;
    }
}

/**
 * Email
 */
function compose() {
    var input = document.getElementById('search-input').value;
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // location.href = "mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody;
    if (re.test(String(input).toLowerCase())) {
        location.href = 'mailto:' + input;
        console.log('mailto:' + input);
    } else {
        location.href = 'mailto:';
        console.log('mailto:');
    }
}

/*document.onkeyup = function (event) {})
document.addEventListener('keydown', function (event) {}) */

// Modify the jQuery ':contains' function to be case-insensitive
jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

var trigger = {
    search: function () { // keyup
        var text = $('#search-input').val();

        // Hide all content class element (.css added for more flexibility)
        $('#box-area .list-area .list-item a').parent().hide().css("visibility", "hidden");

        // Search and show (.css added for more flexibility)
        $('#box-area .list-area .list-item a:contains("' + text.trim() + '")').parent().show().css("visibility", "visible");

        // Hide and show headers
        $('.list-area').show();
        $('.list-area').filter(function () {
            return $(this).find('li:visible').length == 0;
        }).hide();

        document.getElementById('quick-result').innerHTML = this.maths(text);
        
        /*var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // location.href = "mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody;
        if (re.test(String(text).toLowerCase())) {
            $('#mailbox').show();
        } else {
            $('#mailbox').hide();
        }*/
    },
    binds: function (event) { // keydown
        if (event.defaultPrevented) return;

        let input = document.getElementById('search-input');
        let text = input.value;
        if (!($("input").is(":focus")) && !($("textarea").is(":focus")) && !($("#search-prefix").is(":focus"))) input.focus();

        let key = event.key || event.keyCode || event.which;

        if (key === 'Escape' || key === 'Esc' || key === 27) {
            if (input.value.trim() !== '') {
                input.value = '';
            } else {
                input.value = '';
                input.blur();
            }
        } else if (!($("input").is(":focus")) && key === 'Return' || key === 'Enter' || key === 13) {
            this.engine(text);
        }
    },
    maths: function (query) {
        let returns = '';
        let evaluation = '';
        
        if (query.toLowerCase() === 'help') returns = 'i = 1; i++; i';
        if (query.toLowerCase() === 'e') returns = Math.E;
        if (query.toLowerCase() === 'pi') returns = Math.PI;
        
        try { evaluation = eval(query); } catch (e) { evaluation = ''; }
        if (typeof evaluation !== 'undefined' && evaluation) returns = evaluation;
        return returns;
    },
    engine: function (query) {
        if (query.toLowerCase().startsWith('http') || !(query.includes(' ')) && query.includes('.')) {
            window.open('https://' + query.replace('https://', '').replace('http://', ''));
        } else {
            window.open('https://duckduckgo.com/?q=' + query);
        }
    }
}

var cookies = {
    set: function (cname, cvalue, cexpires, cpath) {
        (!cvalue) && (cvalue = null);
        (!cexpires) && (cexpires = 'Tue, 19 Jan 2038 03:14:07 UTC');
        (!cpath) && (cpath = '/');
        document.cookie = cname + '=' + cvalue + '; expires=' + cexpires + '; path=' + cpath;
    },
    get: function (cname) {
        var cname = cname + '=';
        var dcookie = decodeURIComponent(document.cookie);
        var scookie = dcookie.split(';');
        for (var i = 0; i < scookie.length; i++) {
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
    clear: function () {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}
