// This is the "naive" or "brute-force" approach to the
// traveling salesperson algorithm. 
// This is extremely inefficient at finding a solution.

// 1. The distance between the cities is calculated and compared with
// the current shortest.
// 2. Two members of the array are swapped, and the process repeats.

// The yellow line is the best fit so far.

const cities = [],
    cityCount = 10

let best = Infinity,
    bestOrder = cities

function setup() {
    createCanvas(400,300).parent('sketch')
    for (let i = 0; i < cityCount; i++) {
        cities[i] = createVector(random(width), random(height))
    }
}

function draw() {
    background(0)
    noFill()
    stroke(255)
    strokeWeight(2)
    beginShape()
    for (let i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y)
        ellipse(cities[i].x, cities[i].y, 8, 8)
    }
    endShape()

    beginShape()
    stroke(255,255,0)
    strokeWeight(4)
    for (let i = 0; i < bestOrder.length; i++) {
        vertex(bestOrder[i].x, bestOrder[i].y)
    }
    endShape()

    swap(cities, floor(random(0,cities.length)), floor(random(0,cities.length)))

    calcTotalDistance(cities)
}

function swap(arr,idx1,idx2) {
    const temp = arr[idx1]
    arr[idx1] = arr[idx2]
    arr[idx2] = temp
}

function calcTotalDistance(arr) {
    let d = 0
    for (let i = 0; i < arr.length-1; i++) {
        d += dist(arr[i].x, arr[i].y, arr[i+1].x, arr[i+1].y)
    }
    if (d < best) {
        best = d
        bestOrder = cities.slice()
    }
    return d
}
