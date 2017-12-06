const crows = [],
    sprites = []

const CROW_COUNT = 100,
    MIN_CROW_SIZE = 0.2,
    MAX_CROW_SIZE = 0.75,
    MIN_Y_NOISE_SPEED = 0.0001,
    MAX_Y_NOISE_SPEED = 0.00075,
    MIN_FLAP_NOISE_SPEED = 0.00001,
    MAX_FLAP_NOISE_SPEED = 0.0005,
    FLAP_SPEED_SCALE = 10,
    ROTATION_SCALE = 40,
    SPRITE_SIZE = 32,
    Y_AXIS = 1,
    X_AXIS = 2

let GRADIENT_1, GRADIENT_2, GRADIENT_3

let backgroundImage

function setup() {
    createCanvas(innerWidth, innerHeight)
    angleMode(DEGREES)

    GRADIENT_1 = color(96, 118, 137)
    GRADIENT_2 = color(140, 153, 161)
    GRADIENT_3 = color(178, 111, 82)
    backgroundImage = createGradient()

    let i = 7
    while (i--) { sprites.push(loadImage(`crowsprites/sprite_${i}.png`)) }
    i = CROW_COUNT
    while (i--) { crows.push(new Crow()) }
}

function draw() {
    image(backgroundImage, 0, 0)
    crows.forEach(crow => {
        crow.update()
        crow.draw()
    })
}

function randomStart() {
    return createVector(random(-1000, -SPRITE_SIZE), random(height))
}

function toDegrees(radians) {
    return radians*(180/PI)
}

function createGradient() {
    setGradient(0, 0, width, height*0.5, GRADIENT_1, GRADIENT_2, Y_AXIS)
    setGradient(0, height*0.5, width, height, GRADIENT_2, GRADIENT_3, Y_AXIS)

    img = new p5.Image(width, height)
    img.loadPixels()
    loadPixels()
    let i = pixels.length
    while (i--) { img.pixels[i] = pixels[i] }
    img.updatePixels()

    return img
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill()
    if (axis === Y_AXIS) {
        for (let i = y; i <= y + h; i++) {
            stroke(lerpColor(c1, c2, map(i, y, y + h, 0, 1)))
            line(x, i, x + w, i)
        }
    } else if (axis === X_AXIS) {
        for (let i = x; i <= x + w; i++) {
            stroke(lerpColor(c1, c2, map(i, x, x + w, 0, 1)))
            line(i, y, i, y + h)
        }
    }
}