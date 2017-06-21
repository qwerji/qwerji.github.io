function Dice(i) {
    this.elt = document.createElement('div')
    this.elt.classList.add('dice')

    this.elt.style.top = 625 + 'px'
    this.elt.style.left = ((75 * i)-104) + 'px'

    this.pips = []

    this.top = document.createElement('div')
    this.top.style.left = -5 + 'px'
    this.top.style.top = -0.5 + 'px'
    this.top.classList.add('dice-pip')
    this.top.classList.add('top')
    this.elt.appendChild(this.top)

    this.left = document.createElement('div')
    this.left.style.left = -31.7 + 'px'
    this.left.style.top = 45.5 + 'px'
    this.left.classList.add('dice-pip')
    this.left.classList.add('left')
    this.left.classList.add('hidden')
    this.elt.appendChild(this.left)

    this.right = document.createElement('div')
    this.right.style.left = 21.5 + 'px'
    this.right.style.top = 45.5 + 'px'
    this.right.classList.add('dice-pip')
    this.right.classList.add('right')
    this.right.classList.add('hidden')
    this.elt.appendChild(this.right)

    board.elt.appendChild(this.elt)
}

Dice.prototype.roll = function() {
    const diceVal = H.randomInt(0,1)
    diceStates[diceVal].bind(this)()
    this.elt.classList.add('spin')
    function transitionfunc(e) {
        if (e.srcElement.classList.contains('dice-pip')) return
        this.classList.remove('spin')
        this.removeEventListener('transitionend', transitionfunc)
        setRollButtonText()
    }
    this.elt.addEventListener('transitionend', transitionfunc)
    return diceVal
}

const diceStates = {
    0: function() {
        const zero = [ 
            () => {
                this.top.classList.add('hidden')
                this.left.classList.remove('hidden')
                this.right.classList.remove('hidden')
            },
            () => {
                this.top.classList.add('hidden')
                this.left.classList.add('hidden')
                this.right.classList.remove('hidden')
            },
            () => {
                this.top.classList.add('hidden')
                this.left.classList.remove('hidden')
                this.right.classList.add('hidden')
            }
        ]
        zero[H.randomInt(0,zero.length-1)].bind(this)()
    },
    1: function() {
        const one = [ 
            () => {
                this.top.classList.remove('hidden')
                this.left.classList.remove('hidden')
                this.right.classList.add('hidden')
            },
            () => {
                this.top.classList.remove('hidden')
                this.left.classList.add('hidden')
                this.right.classList.remove('hidden')
            },
            () => {
                this.top.classList.remove('hidden')
                this.left.classList.add('hidden')
                this.right.classList.add('hidden')
            }
        ]
        one[H.randomInt(0,one.length-1)].bind(this)()
    }
}

function rollDice() {
    if (rolled) return
    rolled = true
    roll = 0
    dice.forEach(die => roll += die.roll())
}

function setRollButtonText() {
    rollButton.textContent = roll
    if (roll === 0) {
        setTimeout(switchTurn,1500)
    }
}