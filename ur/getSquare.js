function getSquare(player, square) {
    let i
    if (!square) {
        square = board[player + 'start']
        i = 1
    } else {
        i = 0
    }
    while (i < roll) {
        if (!square.next) {
            if (i === roll-1) return scorePiles[player]
            return null
        }
        if (square.next[player]) {
            square = square.next[player]
        } else {
            square = square.next
        }
        i++
    }
    return square
}