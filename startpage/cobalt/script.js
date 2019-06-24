$(document).ready(
    function() {
        loadLinks();
    }
);


// Load links from a JSON file
let catergoryClass;
function loadLinks() {
    $(function () {
        $.getJSON('links.json', function (data) {
            $.each(data.links, function (i, link) {
                catergoryClass = link.category.replace('/', '_').replace(' ', '_');
                $('#box-area').append("<ol class=\'" + catergoryClass + " list-area\'><p class='list-header' onclick='window.open(\"" + link.url + "\")'>" + link.category + "</p></ol>");
                $.each(link.content, function (i, cont) {
                    if (cont.script) {
                        appendString = "<li class='list-item'><a onclick=\"" + cont.script + "\">" + cont.title + "</a></li>"
                        $('.' + catergoryClass).append(appendString);
                    } else if (cont.title) { // is title defined in content
                        $('.' + catergoryClass).append("<li class='list-item'><a href=\'" + cont.url + "\' target='_blank'>" + cont.title + "</a></li>");
                    }
                });
            });
        }).error(function (error) {
            console.log(error);
        });
    });
}

// TODO: Fix this
/*$('#all').find('.one:visible').each(function () {
    // your code....
});*/

// Time
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


/* Key binds
 * Triggered on key DOWN -> Important because search is run on key UP, and the binds need to execute first.
 */
document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) return;

    let input = document.getElementById('search-input');
    input.focus();

    let key = event.key || event.keyCode || event.which;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
        if (input.value.trim() !== '') {
            input.value = '';
        } else {
            input.value = '';
            input.blur();
        }
    }
});

/*
function check(e, k) { return e.key == k || e.which == k || e.keyCode == k }
document.onkeyup = function (event) {
    document.getElementById('search-input').focus();
    //if (check(event, 32)) document.getElementById('search-input').focus();
    if (check(event, 27)) document.getElementById('search-input').blur();
};
*/


// Modify the jQuery ':contains' function to be case-insensitive
jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

/* Search links
 * Triggered on key UP -> Important because key binds are run on key DOWN, and the binds need to execute first.
 */
$(document).ready(function () {
    $('#search-input').keyup(function () {

        // Search text
        var text = $(this).val();

        // Hide all content class element (.css added for more flexibility)
        $('#box-area .list-area .list-item a').parent().hide().css("visibility", "hidden");
        
        // Search and show (.css added for more flexibility)
        $('#box-area .list-area .list-item a:contains("' + text.trim() + '")').parent().show().css("visibility", "visible");

        // Hide and show headers
        $('.list-area').show();
        $('.list-area').filter(function () {
            return $(this).find('li:visible').length == 0;
        }).hide();
    });
});