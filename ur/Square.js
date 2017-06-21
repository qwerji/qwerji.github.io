function Square(board,type,safe) {
    this.type = type
    this.safe = !!safe

    this.piece = null

    this.elt = document.createElement('div')
    this.elt.classList.add('square')
    this.elt.classList.add(this.type)

    if (this.safe) {
        this.elt.classList.add('safe')
    }

    squares.push(this)

    board.elt.appendChild(this.elt)
}

Square.prototype.add = function(piece) {
    this.setPiecePosition(piece)
    if (piece.square) {
        piece.square.reset()
    }
    if (this.piece) {
        this.piece.reset()
    }
    this.piece = piece
    this.piece.square = this
    this.piece.currentSquare = this
    this.piece.elt.addEventListener('transitionend', (() => {
        this.piece.elt.style.zIndex = 4
    }).bind(this), {once:true})
}

Square.prototype.setPiecePosition = function(piece) {
    piece.elt.style.left = (this.elt.offsetLeft + piece.offset) + 'px'
    piece.elt.style.top = (this.elt.offsetTop + piece.offset) + 'px'
}

Square.prototype.reset = function() {
    this.piece = null
}