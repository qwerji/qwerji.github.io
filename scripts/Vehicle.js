function Vehicle() {
    this.pos = createVector()
    this.target = createVector()
    this.vel = p5.Vector.random2D()
    this.acc = createVector()
    this.r = 8
    this.maxSpeed = 6
    this.maxForce = 0.3
    this.color = {
        r:random255(),
        g:random255(),
        b:random255()
    }
}

function random255() {
    return random(colorSlider.value(), colorSlider2.value())
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
}

Vehicle.prototype.show = function() {
    strokeWeight(sizeSlider.value())
    let randomNum = Math.floor(random(0,2))
    if (frameCount % intervalSlider.value() == 0 && randomNum == 1) {
        this.color.r = random255()
        this.color.g = random255()
        this.color.b = random255()
    }
    stroke(this.color.r, this.color.g, this.color.b)
    point(this.pos.x, this.pos.y)
}

Vehicle.prototype.behaviors = function() {
    const mouse = createVector(mouseX, mouseY)
    let behavior = this.flee(mouse)
    if (checkbox.checked()) {
        behavior = this.seek(mouse)
    }
    const arrive = this.arrive(this.target)
    arrive.mult(1)
    behavior.mult(5)
    this.applyForce(arrive)
    this.applyForce(behavior)
}

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f)
}

Vehicle.prototype.seek = function(target) {
    const desired = p5.Vector.sub(target, this.pos)
    const distance = desired.mag()
    if (distance < 50) {
        desired.setMag(this.maxSpeed)
        const steer = p5.Vector.sub(desired, this.vel)
        steer.limit(this.maxForce)
        return steer
    } else {
        return createVector(0,0)
    }
}

Vehicle.prototype.flee = function(target) {
    const desired = p5.Vector.sub(target, this.pos)
    const distance = desired.mag()
    if (distance < 50) {
        desired.setMag(this.maxSpeed)
        desired.mult(-1)
        const steer = p5.Vector.sub(desired, this.vel)
        steer.limit(this.maxForce)
        return steer
    } else {
        return createVector(0,0)
    }
}


Vehicle.prototype.arrive = function(target) {
    const desired = p5.Vector.sub(target, this.pos)
    const distance = desired.mag()
    let speed = this.maxSpeed
    if (distance < 100) {
        speed = map(distance, 0, 100, 0, this.maxSpeed)
    }
    desired.setMag(speed)
    const steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer
}
