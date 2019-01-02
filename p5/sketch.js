var borderWidth = 50;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);

    fill(0,0,0,0);
    stroke(255,220,215);
    strokeWeight(borderWidth);
    rect(0,0,window.innerWidth, window.innerHeight);
    strokeWeight(2);
    rect(borderWidth/2+5,borderWidth/2+5,window.innerWidth-borderWidth-10, window.innerHeight-borderWidth-35);
    noStroke();
    fill(255,220,215);
    rect(borderWidth/2, window.innerHeight-borderWidth, window.innerWidth-borderWidth, window.innerHeight-borderWidth);

    fill(255,255,255);
    stroke(50);
    strokeWeight(1);
    for(lineX = 0; lineX <= window.innerHeight; lineX = lineX + 2) {
        line(0, lineX, window.innerWidth, lineX);
    }
    fill(0,0,0);
}

function draw() {
    text("hello", 100, 100);
}
