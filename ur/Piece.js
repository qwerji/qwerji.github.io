function Piece(player,i) {
    this.offset = 12

    this.player = player

    this.scored = false

    this.currentSquare = null

    this.elt = document.createElement('div')
    this.elt.classList.add('piece')
    this.elt.classList.add(this.player)

    for (let i = 0; i < 5; i++) {
        const pip = document.createElement('div'),
            loc = pipLocations[i]
        pip.classList.add('pip')
        pip.style.left = loc.x + 'px'
        pip.style.top = loc.y + 'px'
        this.elt.appendChild(pip)
    }

    this.elt.addEventListener('click', this.move.bind(this))

    this.elt.addEventListener('mouseover', this.showMove.bind(this))

    this.elt.addEventListener('mouseout', () => {
        squares.forEach(square => square.elt.classList.remove('select'))
        scorePiles.p1.elt.classList.remove('select')
        scorePiles.p2.elt.classList.remove('select')
    })

    if (this.player === 'p1') {
        this.leftStart = -this.offset-75
    } else {
        this.leftStart = this.offset+250
    }
    this.topStart = this.offset*i

    this.elt.style.left = this.leftStart + 'px'
    this.elt.style.top = this.topStart + 'px'

    this.square = null

    board.elt.appendChild(this.elt)
}

Piece.prototype.showMove = function() {
    squares.forEach(square => square.elt.classList.remove('select'))
    scorePiles.p1.elt.classList.remove('select')
    scorePiles.p2.elt.classList.remove('select')
    const square = getSquare(this.player,this.square)
    if (this.cannotMoveTo(square)) return
    if (!square.piece) {
        square.elt.classList.add('select')
    } else if ((square.piece.player !== this.player) && !square.safe) {
        square.elt.classList.add('select')
    }
}

Piece.prototype.move = function() {
    const square = getSquare(this.player,this.square)
    if (this.cannotMoveTo(square)) return
    this.elt.style.zIndex = 5
    if (!this.currentSquare) {
        this.currentSquare = {next: board[this.player + 'start']}
    }
    this.traverse(square)
}

Piece.prototype.reset = function() {
    this.elt.style.left = this.leftStart + 'px'
    this.elt.style.top = this.topStart + 'px'
    this.square = null
    this.currentSquare = null
}

Piece.prototype.cannotMoveTo = function(square) {
    if ((roll === 0) || !square || this.scored) return true
    if ((this.player === turn) && rolled) {
        if (square.piece) {
            if (square.piece.player !== this.player) {
                if (!square.safe) {
                    return false
                }
            }
            return true
        }
        return false
    }
    return true
}

Piece.prototype.traverse = function(target) {
    if (!this.currentSquare.next) {
        scorePiles[this.player].add(this)
        switchTurn(this.square.safe)
        return
    }
    if (target === this.currentSquare.next) {
        this.currentSquare.next.add(this)
        switchTurn(this.square.safe)
        return
    }
    if (this.currentSquare.next[this.player]) {
        if (target === this.currentSquare.next[this.player]) {
            this.currentSquare.next[this.player].add(this)
            switchTurn(this.square.safe)
            return
        } else {
            this.currentSquare = this.currentSquare.next[this.player]
        }
    } else {
        this.currentSquare = this.currentSquare.next
    }
    setTimeout((() => {
        this.currentSquare.setPiecePosition(this)
        this.elt.addEventListener('transitionend', this.traverse.bind(this, target), {once:true})
    }).bind(this),0)
}