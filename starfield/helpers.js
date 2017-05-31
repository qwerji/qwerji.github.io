function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function dist(x1,y1,x2,y2) {
    return Math.sqrt(
        Math.pow(Math.abs(x1 - x2), 2) + 
        Math.pow(Math.abs(y1 - y2), 2)
    )
}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
}

function deltaTime() {
    const now = Date.now()
    mspf = now - fpsTimer
    delta = mspf / 1000
    fpsTimer = now
}

function getAngle(x1,y1,x2,y2) {
    const dx = x1 - x2,
        dy = -y1 - y2
    let inRads = Math.atan2(dy,dx)
    if (inRads < 0) {
        inRads = 2*Math.PI - inRads
    } else {
        inRads = Math.abs(inRads)
    }
    return toDegrees(inRads)
}

function toDegrees(rads) {
    return rads * (180 / Math.PI)
}

let mspf = 0,
    fpsTimer = Date.now(),
    delta = 0