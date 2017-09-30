let MAP, MAP_DIMENSIONS = { w: 0, h: 0 }

Room.generateMap = function(size=floor(random(10,20))) {
    const map = []

    // Create 2D Array of rooms
    for (let i = 0; i < size; i++) { // For every row
        map.push([])
        for (let j = 0; j < size; j++) {
            map[map.length-1].push(new Room(i,j))
        }
    }

    // Initialize pointers

    for (let i = 0; i < size; i++) {
        const row = map[i]
        for (let j = 0; j < size; j++) {
            const next = row[j+1]
            if (next) {
                row[j].s = next
            }
        }
    }
    
    for (let i = 0; i < size; i++) {
        const row = map[i]
        for (let j = size-1; j >= 0; j--) {
            const next = row[j-1]
            if (next) {
                row[j].n = next
            }
        }
    }
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const row = map[j+1]
            if (row) {
                const next = row[i]
                if (next) {
                    map[j][i].e = next
                }
            }
        }
    }
    
    for (let i = 0; i < size; i++) {
        for (let j = size-1; j >= 0; j--) {
            const row = map[j-1]
            if (row) {
                const next = row[i]
                if (next) {
                    map[j][i].w = next
                }
            }
        }
    }

    MAP_DIMENSIONS.h = map.length * ROOM_SIZE
    MAP_DIMENSIONS.w = map[0].length * ROOM_SIZE
    return map
}

function calcTotals(m) {
    totalGold = 0
    totalWumpus = 0
    m.forEach(row => {
        row.forEach(room => {
            if (room.type === 'gold') {
                totalGold++
            } else if (room.type === 'wumpus') {
                totalWumpus++
            }
        })
    })
}