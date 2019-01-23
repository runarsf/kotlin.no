konPos = 0;
konami = [38, 38, 40, 40, 37, 39, 37, 39, 98, 97]; // 98 & 97 are charCodes, since letter-keypress-events don't have keyCodes, the rest are keycodes
$(document).on('keypress keyup', function(e) {
    box = document.getElementById('box');

    if(e.type === 'keypress') {
        if(e.keyCode === konami[konPos] || !e.keycode && e.charCode === konami[konPos]) {
            $('#box').addClass('animate'+e.key); // add animation class
            konPos++;
            if(konPos === konami.length) {
                konPos = 0;
                particles = document.getElementById('particles-js');
                if(particles.style.visibility === 'visible') {
                    particles.style.visibility = 'hidden';
                } else {
                    particles.style.visibility = 'visible';
                }
            }
        } else { konPos = 0; }
    } else { // remove animation class
        $('#box').removeClass('animate'+e.key);
    }
});
