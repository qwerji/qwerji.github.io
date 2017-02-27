let font
const vehicles = []
let input
let checkbox
let colorSlider
let colorSlider2
let staticColorButton
let staticColor = false
let sizeSlider
let intervalSlider
let arrivalSlider
let initial = true
let flee = true
let scatterButton
let behaviorButton
let randomWordButton
let rotateButton
let rotating = false
let loadingLabel
const maxChars = 16
let usedWordIdx = 1
const words = [
    'hello','whatup','vulfpeck','p5.jsIsDope',
    'bentswanson.com','snailedit','TheCodingTrain',
    'DanielSchiffman','LukasYounghams','steering',
    'CraigReynolds','Braitenberg','steer=desire-vel',
    'vehicles','schfiftyfive','odie','poinciana'
]
const apiURL = `http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`

function preload() {
    font = loadFont("fonts/AvenirNextLTPro-Demi.otf") 
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(51)
    textFont(font)
    textSize(192)
    scatterButton = createButton('Scatter')
    scatterButton.position(150, 11)
    scatterButton.mousePressed(scatter)

    behaviorButton = createButton('Flee')
    behaviorButton.position(210, 11)
    behaviorButton.mousePressed(changeBehavior)

    randomWordButton = createButton('?')
    randomWordButton.position(255, 11)
    randomWordButton.mousePressed(setRandomWord)

    rotateButton = createButton('Rotate: OFF')
    rotateButton.position(285, 11)
    rotateButton.mousePressed(rotateDots)

    staticColorButton = createButton('Random Colors')
    staticColorButton.position(370, 11)
    staticColorButton.mousePressed(switchColorsType)

    colorSlider = createSlider(0,255,80)
    colorSlider.position(10, 40)

    colorSlider2 = createSlider(0,255,255)
    colorSlider2.position(10, 55)

    intervalSlider = createSlider(1,20,3)
    intervalSlider.position(10, 70)

    sizeSlider = createSlider(7,25,7)
    sizeSlider.position(10, 85)

    arrivalSlider = createSlider(0,15,15)
    arrivalSlider.position(10, 100)

    input = createInput()
    input.position(10, 10)
    
    loadingLabel = createElement('p')
    loadingLabel.html('')
    loadingLabel.position(150, 40)
    loadingLabel.addClass('white')

    setRandomWord()
    change()
    input.input(change)
}

function random255() {
    return random(0,256)
}

function switchColorsType() {
    intervalSlider.remove()
    staticColor = !staticColor
    if (staticColor) {
        colorSlider.value(random255())
        colorSlider2.value(random255())
        intervalSlider = createSlider(0,255,127)
        intervalSlider.position(10, 70)
        staticColorButton.html('Static Color')
    } else {
        intervalSlider = createSlider(1,20,3)
        intervalSlider.position(10, 70)
        staticColorButton.html('Random Colors')
    }
}

function rotateDots() {
    rotating = !rotating
    if (!rotating) {
        rotateButton.html('Rotate: ON')
    } else {
        rotateButton.html('Rotate: OFF')
    }
}

function setRandomWord() {
    let randomWord
    // Either make an api request or pull from the array
    let api = random(1) > 0.5
    if (api) {
        loadingLabel.html('Querying API...')
        getAPIWord(function(word) {
            loadingLabel.html('')
            randomWord = word
            input.value(randomWord)
            change()
        })
    } else {
        // Ensures a new word
        let randomIdx
        do {
            randomIdx = Math.floor(random(words.length))
        } while(randomIdx == usedWordIdx)
        usedWordIdx = randomIdx
        randomWord = words[randomIdx]
        input.value(randomWord)
        change()
    }
}

function getAPIWord(cb) {
    // Get a word with a random length between 3 and the maxChars
    loadJSON(apiURL, function(data) {
        const word = data.word
        if (word) {
            cb(word) 
        }
    })
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
        // Stop at max characters
        if (filteredWord.length > maxChars) {
            break
        }
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
            if (filteredWord.length == 1 || initial || !vehicles.length) {
                vehicle.pos = randomWindowVector()
            } else {
                let parent = vehicles[Math.floor(random(vehicles.length))]
                vehicle.pos = createVector(parent.pos.x,parent.pos.y)
            }
            vehicles.push(vehicle)
        }
    // If the word requires less points, just pop the extra points (backspace)
    } else if (diff > 0) {
        for (var i = 0; i < diff; i++) {
            vehicles.pop()
        }
    }
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
    initial = false
}

function draw() {
    background(51)
    let loopBound = vehicles.length
    let rotationBool = rotating && frameCount % 20 == 0
    if (rotating && vehicles.length) {
        loopBound = vehicles.length - 1
        if (rotationBool) {
            vehicles[vehicles.length-1].target = vehicles[0].target
        }
    }
    for (var i = 0; i < loopBound; i++) {
        let vehicle = vehicles[i]
        vehicle.behaviors()
        vehicle.update()
        if (rotationBool) {
            vehicle.target = vehicles[i+1].target
        }
        vehicle.show()
    }
}
