const ROOM_SIZE = 40,
    ROOM_FREQUENCIES = {
        wumpus: .15,
        pit: .05,
        gold: .15,
        weapon: .15
    },
    ROOM_IMAGES = {}

let X_OFF = 0, 
    Y_OFF = 0,
    ROOM_PROBS

function Room(i, j) {
    this.n = null
    this.s = null
    this.e = null
    this.w = null
    this.xArr = i
    this.yArr = j
    this.setType()
    this.explored = false
    this.player = false
}

Room.prototype.show = function() {
    fill(53)
    stroke(20)
    
    const x = (this.xArr*ROOM_SIZE) + X_OFF,
        y = (this.yArr*ROOM_SIZE) + Y_OFF
    rect(x, y, ROOM_SIZE, ROOM_SIZE)

    if (this.player) {
        image(ROOM_IMAGES.hero, x, y, ROOM_SIZE, ROOM_SIZE)
    } else if (this.explored) {
        image(this.image, x, y, ROOM_SIZE, ROOM_SIZE)
    } else {
        image(ROOM_IMAGES.unexplored, x, y, ROOM_SIZE, ROOM_SIZE)
    }
}

Room.prototype.setType = function(type=getType()) {
    this.type = type
    this.image = ROOM_IMAGES[this.type]
}