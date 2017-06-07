function Hole(slot) {

    this.elt = document.createElement('div')
    this.elt.classList.add('hole')
    slot.elt.appendChild(this.elt)

    this.disc = null

}

Hole.prototype.addDisc = function(disc) {
    this.disc = disc
    disc.setPos(this)
}