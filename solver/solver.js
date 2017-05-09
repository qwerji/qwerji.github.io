function Solver(pT, dE) {

    this.word = ''
    this.potentialSolutions = {}

    const progressText = pT, displayElt = dE
    let querying = false
    progressText.style.display = 'none'

    const permute = (endStr, startStr = "", perms = []) => {
        if (endStr.length <= 1) {
            // if the end string is 1 character, push the start and end as one permutation
            perms.push(startStr + endStr)
        } else {
            // otherwise, loop through the end string
            for (var i = 0; i < endStr.length; i++) {
                // for each character in the end string, create a new string
                // that is from the beginning to a given character, and then from one after that character
                // to the end of the end string
                const newStr = endStr.substring(0, i) + endStr.substring(i + 1)
                permute(newStr, startStr + endStr.charAt(i), perms)
            }
        }
        return perms
    }
    const API = (word, cb) => {
        const url = `http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=${word}`
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const res = JSON.parse(this.response).results
                cb(res, word)
            }
        }
        xhr.open("GET", url, true)
        xhr.setRequestHeader("Accept", "application/json")
        querying = true
        xhr.send()
    }
    const formatResults = () => {
        while (displayElt.hasChildNodes()) {
            displayElt.removeChild(displayElt.lastChild);
        }
        for (let solution in this.potentialSolutions) {
            const li = document.createElement("LI")
            li.innerHTML = solution
            displayElt.append(li)
        }
    }
    this.solve = () => {
        if (this.word.length > 2 && this.word.length < 7 && !querying) {
            progressText.style.display = "inherit"
            progressText.innerHTML = 'Solving...'
            const allPerms = permute(this.word)
            let count = 0
            this.potentialSolutions = {}
            formatResults()
            for (let i = 0; i < allPerms.length; i++) {
                API(allPerms[i], (res, word) => {
                    count++
                    if (count >= allPerms.length) {
                        querying = false
                        if (this.potentialSolutions.length < 1) {
                            progressText.innerHTML = 'No solutions found'
                        } else {
                            progressText.innerHTML = 'Done'
                        }
                    }
                    if (res.length > 0) {
                        this.potentialSolutions[word] = word
                        formatResults()
                    }
                })
            }
        }
    }
}

