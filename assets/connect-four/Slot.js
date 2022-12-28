function Slot(board) {

    this.elt = document.createElement('div')
    this.elt.classList.add('slot')

    this.holes = new Array(6)
    for (let i = 0; i < this.holes.length; i++) {
        this.holes[i] = new Hole(this)
    }

    board.elt.appendChild(this.elt)
    
    this.elt.addEventListener('click', (() => {
        if (!board.inPlay) return
        const turnclass = board.turn ? 'p1hover' : 'p2hover'
        this.holes.forEach(hole => {
            hole.elt.classList.remove(turnclass)
        })
        const disc = new Disc(board.turn)
        this.dropDisc(disc)
        board.check(disc)
    }).bind(this))

    this.elt.addEventListener('mouseover', (() => {
        if (!board.inPlay) return
        const turnclass = board.turn ? 'p1hover' : 'p2hover'
        this.holes.forEach(hole => {
            hole.elt.classList.add(turnclass)
        })
        this.elt.style.cursor = 'pointer'
    }).bind(this))

    this.elt.addEventListener('mouseout', (() => {
        const turnclass = board.turn ? 'p1hover' : 'p2hover'
        this.holes.forEach(hole => {
            hole.elt.classList.remove(turnclass)
        })
        this.elt.style.cursor = 'default'
    }).bind(this))

}

Slot.prototype.dropDisc = function(disc) {
    for (let i = this.holes.length-1; i >= 0; i--) {
        const hole = this.holes[i]
        if (!hole.disc) {
            hole.addDisc(disc)
            break
        }
    }
}