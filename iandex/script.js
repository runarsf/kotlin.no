// https://www.gun.io/blog/multi-line-strings-in-json
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// file = talos.mla['arkady_journal77'].content.join('\n');

$(function(){
	$.getJSON('texts.json',function(data){
		console.log('jQuery: successfully imported json');
		$.each(data.milton,function(i,mla){
			$('ul').append('<li>'+mla.title+' '+mla.type+'</li>');
		});
	}).error(function(){
		console.log('jQuery: json error');
	});
});


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
}