// window.getComputedStyle(document.documentElement).getPropertyValue('--wallcolor')

$(document).keypress(function(e) {
    stdin = document.getElementById('stdin');
    stdin.focus();
});
function tput(ln) {
    if(ln) { $('#stdout').append(ln+'<br/>'); }
    else { $('#stdout').append(window.getComputedStyle(document.documentElement).getPropertyValue('--prefix').replace(/\'+/g, '')+'<br/>'); }
}

function parse(e) {
    stdin = document.getElementById('stdin');
    stdout = document.getElementById('stdout');

    switch(e.keyCode) {
        case 13:
            tput(stdin.value);
            stdin.value = '';
            break;
    }
}

function updateScroll(){
    var element = document.getElementById('stdout');
    element.scrollTop = element.scrollHeight;
}
