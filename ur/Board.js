function Board() {
    this.p1start = null
    this.p2start = null

    this.elt = document.createElement('div')
    this.elt.classList.add('board')

    constructLL.bind(this)()

    this.p1Display = document.createElement('div')
    const p1Text = document.createElement('p')
    this.p1Display.appendChild(p1Text)
    p1Text.textContent = 'P1'
    this.p1Display.classList.add('p1-display')
    
    this.p2Display = document.createElement('div')
    const p2Text = document.createElement('p')
    this.p2Display.appendChild(p2Text)
    p2Text.textContent = 'P2'
    this.p2Display.classList.add('p2-display')

    this.elt.appendChild(this.p1Display)
    this.elt.appendChild(this.p2Display)

    playArea.appendChild(this.elt)
}