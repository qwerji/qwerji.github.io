function SAOAlert(options={}) {
    this.onAccept = options.onAccept || function() {}
    this.onReject = options.onReject || function() {}
    this.parent = options.parent || document.body

    this.alertBox = document.createElement("div")
    this.alertBox.classList.add("sao-alert", "closed")

    let firstSection = document.createElement("section")
    this.alertBox.appendChild(firstSection)
    this.titleElt = document.createElement("h3")
    this.titleElt.textContent = options.title || "Alert"
    firstSection.appendChild(this.titleElt)

    this.content = document.createElement("p")
    this.content.classList.add("content", "closed")
    this.content.textContent = options.text || ""
    this.alertBox.appendChild(this.content)

    let secondSection = document.createElement("section")
    this.alertBox.appendChild(secondSection)

    let acceptDiv = document.createElement("div")
    secondSection.appendChild(acceptDiv)

    this.accept = document.createElement("p")
    this.accept.textContent = "O"
    this.accept.classList.add("accept", "button")
    acceptDiv.appendChild(this.accept)

    let rejectDiv = document.createElement("div")
    secondSection.appendChild(rejectDiv)

    this.reject = document.createElement("p")
    this.reject.textContent = "X"
    this.reject.classList.add("reject", "button")
    rejectDiv.appendChild(this.reject)
    
    this.accept.addEventListener("click", function(e) {
        this.closeEvent(true)
    }.bind(this))
    this.reject.addEventListener("click", function(e) {
        this.closeEvent(false)
    }.bind(this))
}

SAOAlert.prototype.present = function() {
    this.parent.appendChild(this.alertBox)
    setTimeout(function() {
        let done = false
        let event = function(e) {
            if (done) {
                return
            }
            done = true
            this.content.classList.remove("closed")
            this.alertBox.removeEventListener("transitionend", event)
        }
        this.alertBox.addEventListener("transitionend", event.bind(this))
        this.alertBox.classList.remove("closed")
    }.bind(this), 0)
}

SAOAlert.prototype.closeEvent = function(result) {
    let done = false
    let event = function(e) {
        if (done) {
            return
        }
        done = true
        this.content.classList.add("closed")
        this.alertBox.classList.remove("accordion")
        this.alertBox.removeEventListener("transitionend", event)
        this.parent.removeChild(this.alertBox)
    }
    this.alertBox.addEventListener("transitionend", event.bind(this))
    this.alertBox.classList.add("closed", "accordion")
    result ? this.onAccept() : this.onReject()
}