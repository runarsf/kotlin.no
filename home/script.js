var konPos = 0;
var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
document.addEventListener('keydown', e => {
    /*console.log("if "+e.keyCode+" === "+konami[konPos]+" ("+konPos+", "+e.key+")");*/
    if(e.keyCode === konami[konPos]) {
        $('#box').addClass('animate'+e.key); // add animation class
        ++konPos;
        if(konPos === konami.length) {
            konPos = 0;
            particles = document.getElementById('particles-js');
            particles.style.visibility = (particles.style.visibility === 'visible') ? 'hidden' : 'visible';
        }
    } else {
        if(konPos) {
            $('#box').addClass('shake');
        }
        konPos = 0;
    }
});
document.addEventListener('keyup', e => {
    $('#box').removeClass('animate'+e.key);
    $('#box').removeClass('slide');
    $('#box').removeClass('shake');
});

var date;
$(document).keydown(function (e) {
    /*
    console.log(date+' '+new Date().getTime());
    console.log((new Date().getTime() > date + 1000) ? 'more than one second passed' : 'less than one second passed');
    date = new Date().getTime();
    $('#box').addClass('shake');*/
});
