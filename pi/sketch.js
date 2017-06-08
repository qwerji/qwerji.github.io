let pi = 0,
    odds = 1,
    add = false,
    scale = 1,
    halfWidth,
    halfHeight,
    quarterHeight,
    piTextOffset,
    scaleTextOffset,
    scaleThresh,
    titleOffsetX,
    titleOffsetY


function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    halfWidth = width/2
    halfHeight = height/2
    quarterHeight = height/4
    piTextOffset = halfHeight+13
    scaleTextOffset = quarterHeight+5
    titleOffsetX = 5
    titleOffsetY = height-15
    scaleThresh = halfHeight-50
}

function draw() {
    background(245,245,255)
    add ? pi += 1/odds : pi -= 1/odds
    add = !add
    odds += 2
    const notpi = abs(pi*4),
        loc = map(notpi,PI-scale,PI+scale,0,height)
    strokeWeight(1)
    stroke(0)
    line(0,loc,width,loc)
    stroke(255,100,100)
    line(0,halfHeight,width,halfHeight)
    noStroke()
    textSize(20)
    text('𝜋 ≈ ' + notpi,10,20)
    text('distance from 𝜋: ' + abs(notpi-PI),10,40)
    text('iterations: ' + frameCount,10,60)
    textSize(18)
    text('<-- 𝜋 + ' + (scale/2),0,scaleTextOffset)
    textSize(50)
    text('𝜋',width/2,piTextOffset)
    textSize(40)
    text('calculating 𝜋 from the Leibniz inifinite series',titleOffsetX,titleOffsetY)
    if (frameCount % 100 === 0 && Math.abs(loc) > scaleThresh) {
        scale *= 0.5
    }
}