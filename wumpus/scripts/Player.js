function Player() {
    this.room = null
    this.weapons = 0
    this.gold = 0
    this.killed = 0
    this.alive = true
}

Player.prototype.move = function(dir) {
    const room = this.room[dir]
    if (room) {
        this.enterRoom(room)
    }
}

Player.prototype.enterRoom = function(room) {
    if (!this.alive) {
        return
    }
    if (this.room) {
        this.room.player = false
    }
    this.room = room
    this.room.player = true
    this.room.explored = true

    resetText()

    switch (this.room.type) {
        case 'wumpus':
            if (this.weapons > 0) {
                this.room.type = 'empty'
                appendText(
                    'A horrible wumpus is in this room! You manage to kill it\nbut your sword has been broken.'
                )
                this.weapons--
                this.killed++
                break
            } else {
                die(this.room.type)
                return
            }
        case 'pit':
            die(this.room.type)
            return
        case 'gold':
            this.room.type = 'empty'
            this.gold++
            appendText('You found some gold!')
            break
        case 'weapon':
            this.room.type = 'empty'
            this.weapons++
            appendText('You found a sword!')
            break
        case 'exit':
            appendText("You are at the cave entrance.\nUse Arrow keys or WASD to move.\nPress enter to leave.")
        default:
            break
    }

    this.neighboringRooms()
}

Player.prototype.neighboringRooms = function() {
    const dirs = ['n', 's', 'e', 'w'],
    found = {}
    dirs.forEach(dir => {
        const r = this.room[dir]
        if (r && !found[r.type]) {
            const message = MESSAGES[r.type]
            if (message) {
                appendText(message)
                found[r.type] = true
            }
        }
    })
}

function die(type) {
    resetText()
    if (type === 'wumpus') {
        appendText('A horrible wumpus is in this room!\nUnable to defend yourself empty-handed,\nThe wumpus easily devours you whole.')
    } else if (type === 'pit') {
        appendText('The ground seems to disappear beneath you\nas you step into a massive pit.\nYou fall for what seems like forever until you\nhit the ground and instantly die.')
    }
    appendText('Press enter to restart.')
    player.alive = false
}