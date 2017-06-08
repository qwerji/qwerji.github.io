function Board() {

    this.elt = document.createElement('div')
    this.elt.classList.add('board')
    document.body.appendChild(this.elt)

    this.turn = true

    this.slots = new Array(7)
    for (let i = 0; i < this.slots.length; i++) {
        this.slots[i] = new Slot(this)
    }

    this.inPlay = true

    this.winnerElt = document.createElement('div')
    this.winnerElt.classList.add('winner')

    this.winnerText = document.createElement('p') 
    this.winnerText.textContent = 'Red Wins!'

    this.resetButton = document.createElement('p')
    this.resetButton.classList.add('reset')
    this.resetButton.textContent = 'Reset'
    this.resetButton.addEventListener('click', (() => {
        this.reset()
    }).bind(this))

    this.winnerElt.appendChild(this.winnerText)
    this.winnerElt.appendChild(this.resetButton)
    document.body.appendChild(this.winnerElt)
}

Board.prototype.check = function(disc) {
    // Construct a more easily traverseable grid of
    // the board's current state
    const grid = []
    let zeroCount = 0
    for (let i = 0; i < this.slots.length; i++) {
        const slot = this.slots[i]
        grid[i] = []
        const slotArr = grid[i]
        for (let j = 0; j < slot.holes.length; j++) {
            const hole = slot.holes[j]
            if (hole.disc) {
                if (hole.disc.player) {
                    slotArr.push(1)
                } else {
                    slotArr.push(2)
                }
            } else {
                slotArr.push(0)
                zeroCount++
            }
        }
    }

    // Columns
    for (let i = 0; i < grid.length; i++) {
        const slot = grid[i]
        let pTurn = 1, p1 = 0, p2 = 0
        for (let j = 0; j < slot.length; j++) {
            const hole = slot[j]
            if (hole !== 0) {
                if (pTurn !== hole) {
                    pTurn = hole
                    p1 = 0
                    p2 = 0
                }
                if (pTurn === 1) {
                    p1++
                } else {
                    p2++
                }
            } else {
                p1 = 0
                p2 = 0
            }
            if (p1 >= 4 || p2 >= 4) {
                this.win(disc)
                return
            }
        }
    }

    // Rows
    for (let i = 0; i < grid[0].length; i++) {
        let pTurn = 1, p1 = 0, p2 = 0
        for (let j = 0; j < grid.length; j++) {
            const hole = grid[j][i]
            if (hole !== 0) {
                if (pTurn !== hole) {
                    pTurn = hole
                    p1 = 0
                    p2 = 0
                }
                if (pTurn === 1) {
                    p1++
                } else {
                    p2++
                }
            } else {
                p1 = 0
                p2 = 0
            }
            if (p1 >= 4 || p2 >= 4) {
                this.win(disc)
                return
            }
        }
    }

    // Diagonals
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            // Upper left to bottom right
            let p1 = 0, p2 = 0
            for (let k = 0; k < 4; k++) {
                const col = grid[i+k]
                if (col === undefined) break
                const hole = col[j+k]
                if (hole === undefined) break
                if (hole === 1) p1++
                if (hole === 2) p2++
            }
            if (p1 >= 4 || p2 >= 4) {
                this.win(disc)
                return
            }
            // Upper right to bottom left
            p1 = 0
            p2 = 0
            for (let k = 0; k < 4; k++) {
                const col = grid[i-k]
                if (col === undefined) break
                const hole = col[j+k]
                if (hole === undefined) break
                if (hole === 1) p1++
                if (hole === 2) p2++
            }
            if (p1 >= 4 || p2 >= 4) {
                this.win(disc)
                return
            }
        }
    }
    if (zeroCount === 0) this.draw(disc)
    this.turn = !this.turn
}

Board.prototype.win = function(disc) {
    this.inPlay = false
    disc.elt.addEventListener('transitionend', () => {
        const winner = disc.player ? 'Red' : 'Yellow'
        this.winnerElt.classList.add('fly-in')
        this.winnerText.textContent = `${winner} wins!`
        this.winnerText.style.color = winner.toLowerCase()
    }, {once: true})
}

Board.prototype.draw = function(disc) {
    this.inPlay = false
    disc.elt.addEventListener('transitionend', () => {
        this.winnerElt.classList.add('fly-in')
        this.winnerText.textContent = `Draw`
        this.winnerText.style.color = '#E0E0E0'
    }, {once: true})
}

Board.prototype.reset = function() {
    let count = 0, doneCount = 0
    this.winnerElt.classList.remove('fly-in')
    this.slots.forEach(slot => {
        slot.holes.forEach(hole => {
            if (!hole.disc) return
            count++
            hole.disc.elt.classList.add('fly-out')
            hole.disc.elt.style.transform = `translateY(${(window.innerHeight-hole.elt.offsetTop)+hole.disc.elt.offsetHeight}px)`
            hole.disc.elt.addEventListener('transitionend', () => {
                doneCount++
                if (doneCount === count) {
                    reset()
                }
            }, {once: true})
        })
    })
}
