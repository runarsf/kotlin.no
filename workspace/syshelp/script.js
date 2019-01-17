// TODO: add wallpaper support
$(document).ready(
	function()
	{
		loadjson();
	}
);

var catergoryClass;
var collapsibleId;
var pipeString;
function loadjson() {
	$(function(){
		$.getJSON('helpfile.json', function(data) {
			$.each(data.issues, function(i, issue) {
				catergoryClass = issue.header.toLowerCase().replace(/\/+/g, '').replace(/\s+/g, '').replace(/\'+/g, '').replace(/\(+/g, '').replace(/\)+/g, '').replace(/\.+/g, '').replace(/\,+/g, '');
				$('ul').append("<ol class=\'"+catergoryClass+"\'><h1 class='box'>"+issue.header+"</h1></ol>");
				$('ol.'+catergoryClass).append("<li>"+issue.solution.join('<br/>')+'</li>&nbsp');
			});
		}).error(function(){
			console.log('jQuery: json error');
		});
	});
}
