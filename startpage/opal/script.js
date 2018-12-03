function parse(e) {
    let cmd = document.getElementById('input-field');

    if (e.keyCode === 13) { // enter
        alert(cmd.value);
    } else if (e.keyCode === 27) { // backspace
        cmd.value = "";
    } else {
        console.log(e.keyCode);
    }
}
