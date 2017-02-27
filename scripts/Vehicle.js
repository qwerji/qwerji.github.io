function Vehicle() {
    this.pos = createVector()
    this.target = createVector()
    this.vel = p5.Vector.random2D()
    this.acc = createVector()
    this.r = 8
    this.maxSpeed = 6
    this.maxForce = 0.3
    this.color = {
        r:randomSliderValue(),
        g:randomSliderValue(),
        b:randomSliderValue()
    }
}

function randomSliderValue() {
    return random(colorSlider.value(), colorSlider2.value())
}

Vehicle.prototype.update = function() {
    // Move the position by the velocity's amount each frame
    this.pos.add(this.vel)
    // Change the velocity based on the acceleration
    this.vel.add(this.acc)
    // ? Multiply by zero
    this.acc.mult(0)
}

Vehicle.prototype.show = function() {
    // Random color changes
    strokeWeight(sizeSlider.value())
    if (staticColor) {
        this.color.r = colorSlider.value()
        this.color.g = colorSlider2.value()
        this.color.b = intervalSlider.value()
    } else {
        let randomBool = random(1) > 0.5
        if (frameCount % intervalSlider.value() == 0 && randomBool) {
            this.color.r = randomSliderValue()
            this.color.g = randomSliderValue()
            this.color.b = randomSliderValue()
        }
    }
    stroke(this.color.r, this.color.g, this.color.b)
    // Set the position (Gets called in draw)
    point(this.pos.x, this.pos.y)
}

Vehicle.prototype.behaviors = function() {
    const mouse = createVector(mouseX, mouseY)
    // Pass the target to either flee from or seek to
    let behavior = this.seek(mouse)
    if (flee) {
        behavior = this.flee(mouse)
    }
    const arrive = this.arrive(this.target)
    arrive.mult(arrivalSlider.value()/10)
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
    // Travel at max speed unless you're within 100
    let speed = this.maxSpeed
    if (distance < 100) {
        speed = map(distance, 0, 100, 0, this.maxSpeed)
    }
    desired.setMag(speed)
    const steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer
}
