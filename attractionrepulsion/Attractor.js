function Attractor(x, y, attr) {
    this.pos = createVector(x,y)
    this.attractor = attr
}

Attractor.prototype.show = function() {
    colorMode(RGB)
    if (this.attractor) {
        stroke(0,255,0)
    } else {
        stroke(255,0,0)
    }
    colorMode(HSB,360)
    strokeWeight(3)
    point(this.pos.x, this.pos.y)
}