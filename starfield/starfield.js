const stars = [],
    starSize = 5,
    ship = document.querySelector('.ship')
let starSpeed = 10

function setup() {
    const starCount = Math.floor((window.innerWidth*window.innerHeight)*0.0001)
    for (let i = 0; i < starCount; i++) {
        stars[i] = new Star()
    }
}

function update() {
    deltaTime()
    for (let i = 0; i < stars.length; i++) {
        stars[i].update()
        stars[i].show()
    }
    requestAnimationFrame(update)
}

window.addEventListener('mousemove', e => {
    const d = dist(e.clientX,e.clientY,window.innerWidth/2, window.innerHeight/2),
        maxD = dist(0,0,window.innerWidth/2,window.innerHeight/2),
        angle = getAngle(e.clientX, e.clientY, window.innerWidth/2, window.innerHeight/2)
    starSpeed = map(d, 0, maxD, 30, 0)

    let yRot = (((e.clientX/window.innerWidth) * 90) + 315)
    if (e.clientX < window.innerWidth/2) {
        yRot = map(yRot, 360, 315, 315, 360)
    } else {
        yRot = map(yRot, 360, 405, 405, 360)
    }
    yRot *= 1.5
    yRot += 180
    ship.style.transform = `rotate(${(angle+180)}deg) scale(${(d/maxD)+0.3}) rotateY(${yRot}deg) translate(${ship.offsetHeight*2}px)`
    ship.style.opacity = 1
    ship.style.left = (e.clientX - ship.offsetWidth/2) + 'px'
    ship.style.top = (e.clientY + ship.offsetHeight/2) + 'px'
})

setup()
requestAnimationFrame(update)
