let font
let vehicles = []
let input
let checkbox
let label
let colorSlider
let colorSlider2
let sizeSlider
let intervalSlider
let initial = true
let flee = true
let scatterButton
let behaviorButton

function preload() {
    font = loadFont("fonts/AvenirNextLTPro-Demi.otf") 
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(51)
    textFont(font)
    textSize(192)
    scatterButton = createButton('Scatter')
    scatterButton.position(10, 34)
    scatterButton.mousePressed(scatter)

    behaviorButton = createButton('Flee')
    behaviorButton.position(70, 34)
    behaviorButton.mousePressed(changeBehavior)

    colorSlider = createSlider(0,255,80)
    colorSlider.position(10, 55)

    colorSlider2 = createSlider(0,255,255)
    colorSlider2.position(10, 70)

    sizeSlider = createSlider(7,25,7)
    sizeSlider.position(10, 85)

    intervalSlider = createSlider(1,20,3)
    intervalSlider.position(10, 100)

    label = createElement('p')
    label.position(170,12)
    label.addClass('white')

    input = createInput()
    input.position(10, 10)
    input.value('Hello')
    change()
    input.input(change)
}

function changeBehavior() {
    flee = !flee
    if (flee) {
        behaviorButton.html('Flee')
    } else {
        behaviorButton.html('Seek')
    }
}

function scatter() {
    vehicles.forEach(function(vehicle) {
        vehicle.pos = randomWindowVector()
    })
}

function randomWindowVector() {
    return createVector(random(window.innerWidth),random(window.innerHeight))
}

function changeLabel() {
    if (checkbox.checked()) {
        label.html('Seek')
    } else {
        label.html('Flee')
    }
}

function change() {
    changeWord(input.value())
}

function changeWord(word) {
    // Filter out spaces
    let filteredWord = ''
    for (var i = 0; i < word.length; i++) {
        const letter = word[i]
        if (letter != ' ') {
            filteredWord += letter
        }
    }
    // Don't update if the word is longer than 15 chars
    if (filteredWord.length > 15) {
        return
    }
    // Get the text points
    const points = font.textToPoints(filteredWord, 10, 300)
    // Find the count difference between the current points and the new points
    const diff = vehicles.length - points.length
    // If the word requires more points, add them
    if (diff < 0) {
        for (var i = 0; i < abs(diff); i++) {
            const vehicle = new Vehicle()
            // Choose a random starting point if there are no points to spawn from
            if (filteredWord.length == 1 || initial) {
                vehicle.pos = randomWindowVector()
            } else {
                let parent = points[Math.floor(random(points.length))]
                vehicle.pos = createVector(parent.x,parent.y)
            }
            vehicles.push(vehicle)
        }
        // Set the points' targets
        for (var i = 0; i < points.length; i++) {
            const point = points[i]
            vehicles[i].target = createVector(point.x, point.y)
            // Allows word wrap on up to 2 lines
            let target = vehicles[i].target
            const threshold = window.width - 10
            if (target.x > threshold) {
                target.x -= threshold - 10
                target.y += 200
            }
        }
    // If the word requires less points, just pop the extra points (backspace)
    } else if (diff > 0) {
        for (var i = 0; i < diff; i++) {
            vehicles.pop()
        }
    }
    initial = false
}

function draw() {
    background(51)
    vehicles.forEach(function(vehicle) {
        vehicle.behaviors()
        vehicle.update()
        vehicle.show()
    })
}
