function Node(value=0,root=false,x=0,y=0) {
    this.x = x
    this.y = y
    this.value = value
    this.isRoot = root
    this.elt = document.createElement('p')
    this.elt.textContent = this.value
    this.elt.classList.add('node')
    this.left = null
    this.right = null
    document.body.appendChild(this.elt)

    this.updatePos()
}

Node.prototype.setPos = function(x,y) {
    this.x = x
    this.y = y
    this.updatePos()
}
Node.prototype.updatePos = function() {
    this.elt.style.left = this.x + 'px'
    this.elt.style.top = this.y + 'px'
}
Node.prototype.add = function(node) {
    if (this.value > node.value) {
        if (!this.left) {
            this.left = node
        } else {
            this.left.add(node)
        }
    } else {
        if (!this.right) {
            this.right = node
        } else {
            this.right.add(node)
        }
    }
}
Node.prototype.levelCount = function() {
    if (!this.left && !this.right) return 0
    let left = 0, right = 0
    if (this.left) {
        left = this.left.levelCount()
    }
    if (this.right) {
        right = this.right.levelCount()
    }
    return left + right + 1
}
Node.prototype.adjustPosition = function(parent) {
    if (parent) {
        let x
        const offset = (OFFSET * (this.levelCount()+1))
        console.log(offset)
        if (this.value > parent.value) {
            x = parent.x + offset
        } else {
            x = parent.x - offset
        }
        let y = parent.y + OFFSET
        console.log(x,y)
        this.setPos(x,y)
    }
    console.log(this.elt)
    if (this.left) this.left.adjustPosition(this)
    if (this.right) this.right.adjustPosition(this)
}

function constructTree(size) {
    size = size-1
    const root = new Node(50,true)
    for (let i = 0; i < size; i++) {
        root.add(new Node(H.randomInt(0,100)))
    }
    return root
}

const size = 10,
    OFFSET = size*4,
    root = constructTree(size)

console.log(root)
root.setPos(innerWidth/2,10)
root.adjustPosition()
