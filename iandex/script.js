// https://www.gun.io/blog/multi-line-strings-in-json
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// import { talos } from "texts.json";
// var file = talos.mla['arkady_journal77'].content.join('\n');

foo = "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggg";
document.getElementById("terminput").style.visibility = "hidden";

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