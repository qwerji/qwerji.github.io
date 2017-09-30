// This code ensures that the player is within the largest area possible on the map.
// Theoretically, this will prevent them from being boxed in by wumpuses (wumpi?) or pits

function findOptimalSpawn(current) {
    const start = current

    const dirs = ['e', 's', 'w', 'n']
    let dirIdx = 0

    let best = current,
        bestCount = -Infinity
    do {
        const count = countN(current)
        if (count > bestCount && current.type === 'empty') {
            best = current
            bestCount = count
        }

        if (!current[dirs[dirIdx]]) {
            dirIdx++
        }
        current = current[dirs[dirIdx]]
        
        MAP.forEach(row => {
            row.forEach(room => {
                room._visited = false
            })
        })
    } while (current !== start)

    best.setType('exit')
    
    return best
}

function countN(current, dir) {
    if (!current ||
        current._visited ||
        current.type === 'wumpus' ||
        current.type === 'pit'
    ) {
        return 0
    }
    current._visited = true
    return 1 + countN(current.n) + countN(current.s) + countN(current.e) + countN(current.w)
}