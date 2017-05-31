function Bubble(data, color) {

    this.r = bubbleSize
    this.color = color
    this.x = random(this.r*2,width-(this.r*2))
    this.y = random(this.r*2,height-(this.r*2))

    // Choose a random location that does not intersect
    // with an existing bubble
    for (let i = 0; i < bubbles.length; i++) {
        const that = bubbles[i]
        while (dist(this.x, this.y, that.x, that.y) - this.r - that.r <= 0) {
            this.x = random(this.r*2,width-(this.r*2))
            this.y = random(this.r*2,height-(this.r*2))
        }
    }

    this.vx = random(-bubbleSpeed/2,bubbleSpeed)
    this.vy = random(-bubbleSpeed/2,bubbleSpeed)
    this.intersecting = false
    this.data = data

}

Bubble.prototype.update = function(count=0) {
    this.x += this.vx * delta
    this.y += this.vy * delta

    let changed = false
    if (this.x + this.r >= width || this.x - this.r < 0) {
        this.vx *= -1
        changed = true
    }
    if (this.y + this.r >= height || this.y - this.r < 0) {
        this.vy *= -1
        changed = true
    }
    if (changed && count < 100) this.update(count+1)
}

Bubble.prototype.display = function() {
    fill(this.color.r, this.color.g, this.color.b)
    noStroke()
    ellipse(this.x,this.y,this.r*2)
    const scl = 1.5
    image(this.data.image, this.x-(this.r/2)*scl, this.y-(this.r/2)*scl, this.r*scl, this.r*scl)
}

Bubble.prototype.collide = function(that) {

    const d = dist(this.x, this.y, that.x, that.y)
    if (!(d - this.r - that.r <= 0)) {
        return
    }

    const nx = (that.x - this.x) / d,
        ny = (that.y - this.y) / d,
        p = 2 * (this.vx * nx + this.vy * ny - that.vx * nx - that.vy * ny) / (this.r + that.r),
        vx1 = this.vx - p * this.r * nx,
        vy1 = this.vy - p * this.r * ny,
        vx2 = that.vx + p * that.r * nx,
        vy2 = that.vy + p * that.r * ny

    this.vx = vx1
    this.vy = vy1
    that.vx = vx2
    that.vy = vy2

    this.update()
    that.update()
}