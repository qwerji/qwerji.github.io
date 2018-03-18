let w = 10, colony, slider, resetButton

function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(15)

    colony = new Colony()
    colony.setup()

    slider = createSlider(1,30,15)
    resetButton = createButton('Reset')
    resetButton.mousePressed(colony.setup)
}

function draw() {
    frameRate(slider.value())
    background(230)
    colony.update()
    colony.show()
}

function Colony() {
    this.cells = []
    this.update = () => {

        const next = []

        for (let i = 0; i < this.cells.length; i++) {
            next.push([])
            for (let j = 0; j < this.cells[i].length; j++) {
                next[i].push(new Cell())
                const response = this.cells[i][j].checkNeighbors(i, j, this.cells)
                next[i][j].status = response.status
                next[i][j].reaction = response.reaction
            }
        }
        this.cells = next
    }
    this.show = () => {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j].show(i*w, j*w)
            }
        }
    }
    this.setup = () => {
        const rows = width / w, cols = height / w
        for (let i = 0; i < rows; i++) {
            this.cells[i] = []
            for (let j = 0; j < cols; j++) {
                this.cells[i].push(new Cell())
            }
        }
    }
}

function Cell() {
    this.status = floor(random(2))
    this.reaction = 0
}

Cell.prototype.show = function (x, y) {
    noStroke()

    if (this.status === 0) {
        noFill()
    } else {
        fill(0, 150, 150)
    }

    if (this.reaction === 0) {
        stroke(255, 0, 0)
    } else if (this.reaction === 1) {
        stroke(0)
    } else if (this.reaction === 2) {
        stroke(0, 255, 0)
    } else {
        noStroke()
    }

    ellipse(x + 5, y + 5, 9)
}

Cell.prototype.checkNeighbors = function (i,j,cells) {
    const cell = cells[i][j]

    let neighbors = 0

    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            if (cells[k] && cells[k][l] && !(k === i && j === l)) {
                neighbors += cells[k][l].status
            }
        }
    }

    // console.log(neighbors)

    // Rules
    // More than 3 neighbors = death
    if (cell.status === 1 && neighbors > 3) {
        return {reaction: 0, status: 0}
    }
    // Less than 2 neighbors = death
    else if (cell.status === 1 && neighbors < 2) {
        return {reaction: 1, status: 0}
    }
    // 3 neighbors = life
    else if (cell.status === 0 && neighbors === 3) {
        return {reaction: 2, status: 1}
    }
    // else = stasis
    else {
        return {reaction: 3, status: cell.status}
    }
    
}