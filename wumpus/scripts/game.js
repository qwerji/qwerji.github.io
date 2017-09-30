let player,
    infoText = '',
    totalGold = 0,
    totalWumpus = 0

function preload() {
    const imagePath = './../static/img/'
    ROOM_IMAGES.unexplored = loadImage(imagePath + 'unexplored.png')
    ROOM_IMAGES.weapon = loadImage(imagePath + 'weapon.png')
    ROOM_IMAGES.hero = loadImage(imagePath + 'hero.png')
    ROOM_IMAGES.gold = loadImage(imagePath + 'gold.png')
    ROOM_IMAGES.exit = loadImage(imagePath + 'exit.png')
    ROOM_IMAGES.empty = loadImage(imagePath + 'empty.png')
    ROOM_IMAGES.wumpus = loadImage(imagePath + 'wumpus.png')
    ROOM_IMAGES.pit = loadImage(imagePath + 'pit.png')
}

function setup() {
    createCanvas(innerWidth, innerHeight)
    constructProbs()
    newGame()
}

function draw() {
    background(60)
    X_OFF = ((width - MAP_DIMENSIONS.w)/2)
    Y_OFF = ((height - MAP_DIMENSIONS.h)/2) - 30
    MAP.forEach(row => {
        row.forEach(room => {
            room.show()
        })
    })
    fill(245)
    textSize(20)
    text(infoText, X_OFF, MAP_DIMENSIONS.h + Y_OFF + 20)

    text('Gold: ' + player.gold, X_OFF, Y_OFF - 10)
    text('Swords: ' + player.weapons, X_OFF + 100, Y_OFF - 10)
}

function newGame() {
    MAP = Room.generateMap()
    calcTotals(MAP)
    player = new Player()
    const spawn = findOptimalSpawn(MAP[0][0])
    player.enterRoom(spawn)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(e) {
    let dir = ''
    switch (key) {
        case 'W':
        case '&':
            dir = 'n'
            break
        case 'D':
        case "'":
            dir = 'e'
            break
        case 'S':
        case '(':
            dir = 's'
            break
        case 'A':
        case '%':
            dir = 'w'
            break
        default:
            break
    }

    if (dir !== '') {
        player.move(dir)
    }

    if (e.key === 'Enter') {
        if (!player.alive) {
            newGame()
        } else if (player.room.type === 'exit') {
            const p = player,
                m = MAP
                t = totalGold,
                w = totalWumpus
            newGame()
            setText('You made it out alive!\n')
            appendText(`You collected ${p.gold} out of ${t} gold.`)
            appendText(`You killed ${p.killed} out of ${w} wumpus.`)
            appendText('Now try this one!')
            player.neighboringRooms()
        }
    }
}