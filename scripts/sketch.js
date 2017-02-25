let font
let vehicles = []
let input
let checkbox
let label
let colorSlider
let colorSlider2
let sizeSlider
let intervalSlider

function preload() {
    font = loadFont("fonts/AvenirNextLTPro-Demi.otf") 
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(51)
    textFont(font)
    textSize(192)
    colorSlider = createSlider(0,255,80)
    colorSlider.position(220, 13)

    colorSlider2 = createSlider(0,255,255)
    colorSlider2.position(370, 13)

    sizeSlider = createSlider(7,25,7)
    sizeSlider.position(520, 13)

    intervalSlider = createSlider(1,20,3)
    intervalSlider.position(670, 13)

    checkbox = createCheckbox()
    checkbox.position(150,10)

    label = createElement('p')
    label.position(170,12)
    label.addClass('white')

    changeLabel()
    checkbox.changed(changeLabel)

    input = createInput()
    input.position(10, 10)
    input.value('Hello')
    change()
    input.input(change)
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
            if (filteredWord.length == 1) {
                vehicle.pos = createVector(random(window.width),random(window.height))
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
}

function draw() {
    background(51)
    vehicles.forEach(function(vehicle) {
        vehicle.behaviors()
        vehicle.update()
        vehicle.show()
    })
}
