const game = (() => {

    let playerTurn, board, playerHand, nimHand, hack = false

    function Peg() {
        this.peg = true
    }

    function reset(_playerTurn = true) {
        console.clear()
        console.log('-- NIM --')
        console.log('Call "take(num)", replacing "num" with 1,2, or 3, to take that many pegs.')
        console.log('Whoever takes the last peg wins.')
        console.log('Game Started')

        playerTurn = _playerTurn
        playerHand = []
        nimHand = []
        board = []

        for (let i = 0; i < 12; i++) {
            board.push(new Peg())
        }

        if (!playerTurn) {
            if (!hack) {
                board.push(new Peg()) // This line makes the game impossible to win
            }
            nimTake()
        } else {
            console.log('----------')
            console.log(`Nim's hand: ${getPegs(nimHand.length)}`)
            console.log(`Pegs: ${getPegs(board.length)}`)
            console.log(`Your hand: ${getPegs(playerHand.length)}`)
            console.log('----------')
            console.log("Your turn")
        }
    }

    function playerTake(num) {
        if (num < 4 && num > 0) {
            if (board.length <= 0) {
                reset()
            }
            console.clear()
            for (let i = 0; i < num; i++) {
                playerHand.push(board.pop())
            }
            console.log(`You took ${getPegs(num)}`)

            if (board.length <= 0) {
                console.log('----------')
                console.log(`Nim's hand: ${getPegs(nimHand.length)}`)
                console.log(`Pegs: ${getPegs(board.length)}`)
                console.log(`Your hand: ${getPegs(playerHand.length)}`)
                console.log('----------')
                console.log("Game Over: You win")
                console.log(`Reset: You can call "myTurn()" to start with your turn, and "nimsTurn()" to start with Nim's turn.`)
            } else {
                nimTake()
            }
        } else {
            console.log('Call take(num), passing in 1,2, or 3, to take a peg.')
        }
    }

    function nimTake() {
        let count = 0

        do {
            if (count >= 3) { break }
            nimHand.push(board.pop())
            count++
        } while (board.length % 4 != 0)

        console.log(`Nim took ${getPegs(count)}`)
        console.log('----------')
        console.log(`Nim's hand: ${getPegs(nimHand.length)}`)
        console.log(`Pegs: ${getPegs(board.length)}`)
        console.log(`Your hand: ${getPegs(playerHand.length)}`)
        console.log('----------')

        if (board.length <= 0) {
            console.log("Game Over: Nim wins")
            console.log(`Reset: You can call "myTurn()" to start with your turn, and "nimsTurn()" to start with Nim's turn.`)
        } else {
            console.log("Your Turn")
        }
    }

    function getPegs(num) {
        let str = ''
        for (let i = 0; i < num; i++) {
            str += '🔵'
        }
        return str || 'None'
    }

    function hackIt() {
        hack = !hack
    }

    reset()

    return {
        take: function(num) {
            playerTake(num)
        },
        reset: function(playerTurn) {
            reset(playerTurn)
        },
        hack: function() {
            hackIt()
        }
    }

})()

const take = game.take,
    myTurn = function() {
        game.reset()
    },
    nimsTurn = function() {
        game.reset(false)
    },
    hack = function() {
        game.hack()
    }
