function constructProbs() {
    const newProbs = []
    let total = 0
    for (let type in ROOM_FREQUENCIES) {
        let prob = ROOM_FREQUENCIES[type]
        let newProb = {}
        newProb.name = type
        total += prob
        newProb.prob = total
        newProbs.push(newProb)
    }
    newProbs.sort((a, b) => a.prob > b.prob)
    ROOM_PROBS = newProbs
}

function getType() {
    const num = random(1)
    for (let i = 0; i < ROOM_PROBS.length; i++) {
        let type = ROOM_PROBS[i]
        if (num < type.prob) {
            return type.name
        }
    }
    return 'empty'
}