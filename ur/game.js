const playArea = document.querySelector('.play-area'),
    rollButton = document.querySelector('.roll'),
    resetButton = document.querySelector('.reset'),
    gameoverDisplay = document.querySelector('.gameover')

let turn = 'p2'

let roll = 0

let rolled = false

let squares = []

let scores = {
    p1: 0,
    p2: 0
}

const board = new Board()

let dice = []

for (let i = 1; i <= 4; i++) {
    dice.push(new Dice(i))
}

const p1Pieces = []
for (let i = 0; i < 7; i++) {
    p1Pieces.push(new Piece('p1',i))
}

const p2Pieces = []
for (let i = 0; i < 7; i++) {
    p2Pieces.push(new Piece('p2',i))
}

const scorePiles = {
    p1: new ScorePile('p1'),
    p2: new ScorePile('p2')
}

rollButton.addEventListener('click', rollDice)
resetButton.addEventListener('click', reset)

function switchTurn(reroll) {
    let bool = turn === 'p1'
    if (reroll) {
        bool = !bool
    }
    if (bool) {
        turn = 'p2'
        p2Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p1Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P2 Roll'
        board.p2Display.classList.add('show')
        board.p1Display.classList.remove('show')
    } else {
        turn = 'p1'
        p1Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p2Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P1 Roll'
        board.p2Display.classList.remove('show')
        board.p1Display.classList.add('show')
    }
    rolled = false
}
switchTurn()

function win(player) {
    gameoverDisplay.textContent = player.toUpperCase() + ' wins!'
    gameoverDisplay.classList.add('fly-in')
}

function reset() {
    gameoverDisplay.classList.remove('fly-in')
    turn = 'p2'
    switchTurn()
    scores = {
        p1: 0,
        p2: 0
    }
    p1Pieces.forEach(piece => piece.reset())
    p2Pieces.forEach(piece => piece.reset())
    squares.forEach(square => square.reset())
}

window.addEventListener('keyup', e => {
    if (e.key === ' ') {
        rollDice()
    }
})