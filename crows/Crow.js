class Crow {
    constructor() {
        this.spriteIndex = 0
        this.flapTime = 5
        this.flapNoiseIndex = random(1000)
        this.flapNoiseSpeed = random(MIN_FLAP_NOISE_SPEED, MAX_FLAP_NOISE_SPEED)
        this.upFlap = false

        let sizeScale = random(MIN_CROW_SIZE, MAX_CROW_SIZE)
        this.size = SPRITE_SIZE * sizeScale
        
        this.yNoiseIndex = random(1000)
        this.yNoiseSpeed = random(MIN_Y_NOISE_SPEED, MAX_Y_NOISE_SPEED)
        this.pos = randomStart()
        this.previousPos = this.pos.copy()
        this.speed = createVector(sizeScale*2, 0)
    }
    draw() {
        push()
        translate(this.pos.x, this.pos.y)
        rotate((this.pos.y - this.previousPos.y) * ROTATION_SCALE)
        const halfSize = this.size/2
        image(sprites[this.spriteIndex], -halfSize, -halfSize, this.size, this.size)
        pop()
    }
    update() {
        if (this.pos.x > width + SPRITE_SIZE) {
            crows.splice(crows.indexOf(this), 1, new Crow())
            return
        }
        this.yNoiseIndex += this.yNoiseSpeed
        this.previousPos = this.pos.copy()
        this.pos.x += this.speed.x
        this.pos.y = noise(this.yNoiseIndex) * height

        this.flapNoiseIndex += this.flapNoiseSpeed
        this.flapTime = floor(noise(this.flapNoiseIndex) * FLAP_SPEED_SCALE)

        if (frameCount % this.flapTime === 0) {
            this.upFlap ? this.spriteIndex-- : this.spriteIndex++
            if (this.spriteIndex > 5 || this.spriteIndex < 1 ) {
                this.upFlap = !this.upFlap
            }
        }
    }
}