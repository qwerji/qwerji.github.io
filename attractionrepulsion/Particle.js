function Particle() {
    this.pos = createVector(random(width/4,width-(width/4)), random(height/4,height-(height/4)))
    this.vel = createVector()
    this.acc = createVector()
    this.mass = 4
    this.prev = createVector(this.pos.x, this.pos.y)
}

Particle.prototype.update = function() {
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
}

Particle.prototype.show = function() {
    const totalVel = this.vel.x + this.vel.y
    let h = map(totalVel, -maxVel, maxVel, 0, 360)
    if (h) {
        stroke(h,360,360,alpha)
    } else {
        stroke(h,0,360,alpha)
    }
    strokeWeight(this.mass)
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y)
    this.prev = createVector(this.pos.x, this.pos.y)
}

Particle.prototype.attracted = function(target) {
    // Create a vector pointing from the particle to the target
    const force = p5.Vector.sub(target.pos, this.pos)
    let d = force.mag() // distance squared
    d = constrain(d, 5, 25)
    if (!target.attractor) {
        force.mult(-10)
    }
    const strength = G/(d*d) // Calculate strength of force
    force.setMag(strength)
    this.acc.add(force.mult(this.mass))
}