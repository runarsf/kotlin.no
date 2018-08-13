// https://www.gun.io/blog/multi-line-strings-in-json
function open(textFile) {
	$(function(){
		$.getJSON('texts.json', function(data) {
			console.log('jQuery: successfully imported json');
			$.each(data.milton, function(i, mla) {
				if(textFile === mla.title+'.'+mla.type) {
					$('ul').empty();
					scratchpad();
					$('ul').append('<li>'+mla.title+'.'+mla.type+'</li>');
					$('ul').append('<li>'+mla.content.join('<br/>')+'</li>&nbsp')
				}
			});
		}).error(function(){
			console.log('jQuery: json error');
		});
	});
}


function scratchpad() {
	if(document.getElementById("scratchpad").style.visibility === "visible") {
		document.getElementById("scratchpad").style.visibility = "hidden";
		document.getElementById("bgblur").style.visibility = "hidden";
	}
	else {
		document.getElementById("scratchpad").style.visibility = "visible";
		document.getElementById("bgblur").style.visibility = "visible";
	}
}

document.addEventListener("keydown", event => {
	if(event.keyCode == 13) {
		alert("asd");
	}
});


function colorScheme(bgColor, textColor, rulerColor) {
	document.getElementById("body").style.backgroundColor = bgColor;
	document.getElementById("terminput").style.backgroundColor = bgColor;
	document.getElementById("jsontext").style.color = textColor;
}
function loadScheme(scheme) {
	if(scheme === "solarizedDark") {
		colorScheme("#002B36", "#839496");
	}
	else if(scheme === "solarizedLight") {
		colorScheme("#FDF6E3");
	}
}