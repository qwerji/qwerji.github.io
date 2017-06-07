function Disc(turn) {

    this.player = turn

    this.elt = document.createElement('div')
    this.elt.classList.add('disc')

    if (this.player) {
        this.elt.classList.add('p1')
    } else {
        this.elt.classList.add('p2')
    }

}

Disc.prototype.setPos = function(hole) {
    hole.elt.appendChild(this.elt)
    this.elt.style.transform = `translateY(-${hole.elt.offsetTop+this.elt.offsetHeight}px)`
    setTimeout((() => {
        this.elt.classList.add('dropped')
    }).bind(this), 0)
    this.elt.addEventListener('transitionend', function() {
        this.style.transform = ''
        this.classList.remove('dropped')
    }, {once: true})
}