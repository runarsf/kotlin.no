document.onkeyup = function(e) {
    let cmd = document.getElementById('input-field');

    if(e.keyCode === 32) { // space
        if(enableKeybinds) { cmd.focus(); }
    }
}

function parse(e) {
    let cmd = document.getElementById('input-field');
	let out = document.getElementById('output-field');

    else if(e.keyCode === 13) { // enter
		histIndex = history.length;
        if(!(cmd.value.replace(/(\s*)/gm, "") === "")) {
            history[history.length] = cmd.value;
            histIndex = history.length;
			/*if(history != null) {
				let historyStr = JSON.stringify(history);
				setCookie('historyCookie', historyStr); // failed to write history to cookie
			}*/
            submit(cmd.value);
        }
        cmd.value = "";
	} else if(e.keyCode === 27) { // esc
		if(cmd.value === "") { cmd.blur(); }
        cmd.value = "";
        histIndex = history.length;
    }
}

