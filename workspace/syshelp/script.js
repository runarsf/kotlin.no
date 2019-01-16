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
			$.each(data.links, function(i, link) {
				catergoryClass = link.category.replace('/', '_').replace(' ', '_');
				$('ul').append("<ol class=\'"+catergoryClass+"\'><h1 class='box' onclick='linkIt(\""+link.url+"\")'>"+link.category+"</h1></ol>");
				$.each(link.content, function(i, cont) {
					if(cont.script) {
						appendString = "<li><a onclick=\""+cont.script+"\">"+cont.title+"</a></li>"
						$('.'+catergoryClass).append(appendString);
					} else if(cont.pipe) { // is pipe defined in content?
						pipeString = "<li><a href=\'"+cont.url+"\', target='_blank'>"+cont.title+"</a>"
						$.each(cont.pipe, function(i, pipe) {
							pipeString = pipeString + "<a id='noSelect'> | <a>" + "<a href=\'"+pipe.url+"\', target='_blank'> "+pipe.title+" </a>"
						});
						pipeString = pipeString + "</li>"
						$('.'+catergoryClass).append(pipeString);
					} else if(cont.title) { // is title defined in content
						$('.'+catergoryClass).append("<li><a href=\'"+cont.url+"\', target='_blank'>"+cont.title+"</a></li>");
					} else if(cont.collapsible) { // is collapsible defined in content
						collapsibleId = catergoryClass+cont.collapsible.replace('/', '_').replace(' ', '_');
						$('.'+catergoryClass).append("<div class='wrap-collapsible'><input id=\'"+collapsibleId+"\' class='toggle' type='checkbox'><label for=\'"+collapsibleId+"\' class='lbl-toggle'>"+cont.collapsible+"</label><div class='collapsible-content'><div class='content-inner "+collapsibleId+"\'></div></div></div>");
						$.each(cont.items, function(i, coll) {
							$('.'+collapsibleId).append("<li><a href=\'"+coll.url+"\', target='_blank'> "+coll.title+" </a></li>");
						});
					}
				});
			});
		}).error(function(){
			console.log('jQuery: json error');
		});
	});
}
