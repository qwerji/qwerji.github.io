// Lexicographical ordering
// Find every possible permutation of a set of values

function nextLex(arr) {
    // 1. Find the largest index (i) where arr[i] < arr[i+1]
    //     Meaning, find the last index of the array, where the
    //     array member is less than the one after it.
    let largestI = -1
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i+1]) {
            largestI = i
        }
    }
    if (largestI === -1) {
        // Last permutation
        noLoop()
    }

    // 2. Find the largest index (j) where arr[i] < arr[j]
    //     Find the largest array member that is less than
    //     the first index's member
    let largestJ = -1
    for (let j = 0; j < arr.length; j++) {
        if (arr[largestI] < arr[j]) {
            largestJ = j
        }
    }
    
    // 3. Swap arr[i] and arr[j]
    swap(arr, largestI, largestJ)

    // 4. Reverse the array from i+1 to the end
    return arr.concat(arr.splice(largestI+1).reverse())
}

let vals = [0,1,2,3,4,5,6,7,8,9],
    count = 0
const totalPerms = rFactorial(vals.length)

function setup() {
    createCanvas(400,300).parent('sketch')
}

function draw() {
    count++
    background(0)
    textSize(64)
    fill(255)
    let txt = ''
    for (let i = 0; i < vals.length; i++) {
        txt += vals[i]
    }
    text(txt, 20, height/2)
    textSize(32)
    text(((count/totalPerms)*100).toFixed(4) + '% complete', 20, height-(height/4))
    vals = nextLex(vals)
}

function swap(arr,idx1,idx2) {
    const temp = arr[idx1]
    arr[idx1] = arr[idx2]
    arr[idx2] = temp
}

function rFactorial(num) {
    if (num === 1) return num
    return num*rFactorial(num-1)
}
