function API(word,cb) {
    const url = `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/test?key=97eec621-932a-4dec-b814-9032255654db`
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    console.log(xhr)
    xhr.onreadystatechange = function() {
        // if (this.readyState === 4 && this.status === 200) {
            cb(this)
        // }
    }
    xhr.open("GET", url, true)
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    xhr.setRequestHeader("Access-Control-Allow-Headers", ["Content-Type, x-xsrf-token"]);
    xhr.send()
}

API('hello',res => {
    console.log(res)
})






function rPermuteString(endStr, startStr="", perms=[]) {
    if (endStr.length <= 1){
        // if the end string is 1 character, push the start and end as one permutation
        perms.push(startStr + endStr)
    } else {
        // otherwise, loop through the end string
        for (var i = 0; i < endStr.length; i++) {
            // for each character in the end string, create a new string
            // that is from the beginning to a given character, and then from one after that character
            // to the end of the end string
            const newStr = endStr.substring(0, i) + endStr.substring(i + 1)
            rPermuteString(newStr, startStr + endStr.charAt(i), perms)
        }
    }
    return perms
}
const str = "slwarp"
const allPerms = rPermuteString(str)
