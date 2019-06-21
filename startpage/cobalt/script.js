$(document).ready(
    function() {
        loadLinks();
    }
);

// https://www.w3schools.com/howto/howto_js_filter_lists.asp
// https://www.w3schools.com/jquery/jquery_filters.asp

let catergoryClass;

function loadLinks() {
    $(function () {
        $.getJSON('links.json', function (data) {
            $.each(data.links, function (i, link) {
                catergoryClass = link.category.replace('/', '_').replace(' ', '_');
                $('ul').append("<ol class=\'" + catergoryClass + "\'><p class='box' onclick='window.open(\"" + link.url + "\")'>" + link.category + "</p></ol>");
                $.each(link.content, function (i, cont) {
                    if (cont.script) {
                        appendString = "<li><a onclick=\"" + cont.script + "\">" + cont.title + "</a></li>"
                        $('.' + catergoryClass).append(appendString);
                    } else if (cont.title) { // is title defined in content
                        $('.' + catergoryClass).append("<li><a href=\'" + cont.url + "\', target='_blank'>" + cont.title + "</a></li>");
                    }
                });
            });
        }).error(function (error) {
            console.log(error);
        });
    });
}