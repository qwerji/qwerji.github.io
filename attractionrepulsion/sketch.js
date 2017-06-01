let maxVel = 0,
    alpha = 360,
    G = 6.67408, // Universal gravitational constant
    attractorBool = true,
    showAttr = true,
    attractors = [],
    particles = [],
    trails = false

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    for (let i = 0; i < 100; i++) {
        particles[i] = new Particle()
    }
    colorMode(HSB,360)
    background(5)
}

function draw() {
    if (!trails) background(5)
    let bestVel = 0
    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < attractors.length; j++) {
            particles[i].attracted(attractors[j])
        }
        particles[i].update()
        particles[i].show()
        const tV = abs(particles[i].vel.x + particles[i].vel.y)
        if (tV > bestVel) {
            bestVel = tV
        }
    }
    maxVel = bestVel
    if (showAttr) {
        for (let i = 0; i < attractors.length; i++) {
            attractors[i].show()
        }
    }
}

function mousePressed(e) {
    attractors.push(new Attractor(mouseX, mouseY, attractorBool))
}
