var borderSize = 100;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);

    // outter main border
    fill(0);
    stroke(255,220,215);
    strokeWeight(borderSize);
    rect(0-borderSize/4, 0-borderSize/4, width+borderSize/2, height+borderSize/8);

    // inner thin border
    strokeWeight(2);
    rect(0+borderSize/3, 0+borderSize/3, width-borderSize/1.5, height-borderSize-borderSize/15);

    // draw old-monitor-like lines
    fill(255);
    stroke(50);
    strokeWeight(1);
    for(lineX = 0; lineX <= height; lineX = lineX + 2) {
        line(0, lineX, width, lineX);
    }
}



function draw() {
    fill(255);
    stroke(0);
    text(1, 100, 100);
}

function windowResized() {
    setup();
}
