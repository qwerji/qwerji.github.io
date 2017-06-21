function ScorePile(player) {
    this.player = player

    if (this.player === 'p1') {
        this.left = 0
    } else {
        this.left = 150
    }
    this.top = 300

    this.elt = document.createElement('div')
    this.elt.classList.add('score-pile')
    this.elt.style.left = this.left + 'px'
    this.elt.style.top = this.top + 'px'

    board.elt.appendChild(this.elt)
}

ScorePile.prototype.add = function(piece) {
    piece.scored = true
    piece.elt.style.left = (this.left + piece.offset) + 'px'
    piece.elt.style.top = (piece.topStart + this.top + 10) + 'px'
    if (piece.square) {
        piece.square.reset()
    }
    piece.square = this
    scores[piece.player]++
    if (scores[piece.player] >= 7) {
        win(piece.player)
    }
}