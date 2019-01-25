function parse(e) {
    stdin = document.getElementById('stdin');

    if(e.keyCode === 13) {
        console.log(e);
        stdin.value = '';
    }
}
