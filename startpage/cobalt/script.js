$(document).ready(
    function() {
        loadLinks();
    }
);

// https://www.w3schools.com/howto/howto_js_filter_lists.asp

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


$(document).ready(function () {
    $('#search-input').keyup(function () {

        // Search text
        var text = $(this).val();

        // Hide all content class element
        $('#box-area .list-area .list-item a').hide();

        // Search and show
        $('#box-area .list-area .list-item a:contains("' + text + '")').show();

    });
});