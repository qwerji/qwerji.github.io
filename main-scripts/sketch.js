let bubbles = [],
    mspf = 0,
    fpsTimer = Date.now(),
    links,
    bubbleSize,
    delta = 0,
    textNode
const bubbleSpeed = 100

function preload() {
    links = [
        {
            link:'steering',
            image: loadImage('images/1.svg'),
            title: 'Steering Behaviors'
        },
        {
            link:'solver',
            image: loadImage('images/2.svg'),
            title: 'Jumble Solver'
        },
        {
            link:'matter',
            image: loadImage('images/3.svg'),
            title: 'Matter.js + DOM Elements'
        },
        {
            link:'gol',
            image: loadImage('images/4.svg'),
            title: 'The Game Of Life'
        },
        {
            link:'nixie',
            image: loadImage('images/5.svg'),
            title: 'Nixie Tubes Clock'
        },
        {
            link:'nimconsole',
            image: loadImage('images/6.svg'),
            title: 'Nim'
        },
        {
            link:'traveling-salesperson/naive/',
            image: loadImage('images/7.svg'),
            title: 'Traveling Salesperson'
        },
        {
            link:'starburst',
            image: loadImage('images/8.svg'),
            title: 'Star Burst'
        }
    ]
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    bubbleSize = floor((width*height)*0.000045)
    for (let i = 0; i < links.length; i++) {
        bubbles.push(new Bubble(links[i]))
    }
    textNode = {
        bubble: null
    }
    textFont("Monaco")
    textSize(bubbleSize*0.6)
}

function draw() {
    background(53)
    deltaTime()
    for (let i = 0; i < bubbles.length; i++) {
        const b1 = bubbles[i]
        b1.update()
        for (let j = 0; j < bubbles.length; j++) {
            const b2 = bubbles[j]
            if (b1 !== b2) b1.collide(b2)
        }
        b1.display()
    }
    if (textNode.bubble) {
        fill(230)
        text(textNode.bubble.data.title,textNode.bubble.x-textNode.bubble.r,textNode.bubble.y-textNode.bubble.r-20)
    }
}

function pointIntersects(point, bubble) {
    if (dist(point.x, point.y, bubble.x, bubble.y) - bubble.r <= 0) {
        return true
    }
    return false
}

function deltaTime() {
    const now = Date.now()
    mspf = now - fpsTimer
    delta = mspf / 1000
    fpsTimer = now
}

function mousePressed() {
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i]
        if (pointIntersects({x: mouseX, y: mouseY}, bubble)) {
            window.location.href += bubble.data.link
        }
    }
}

function mouseMoved() {
    let found = false
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i]
        if (pointIntersects({x: mouseX, y: mouseY}, bubble)) {
            textNode.bubble = bubble
            found = true
            break
        }
    }
    if (!found && textNode) {
        textNode.bubble = null
    }
}
