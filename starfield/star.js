function Star() {

    this.x = randomInt(-window.innerWidth, window.innerWidth)
    this.y =  randomInt(-window.innerHeight, window.innerHeight)
    this.z = randomInt(0, window.innerWidth)
    this.elt = document.createElement('div')
    this.elt.classList.add('star')
    document.body.appendChild(this.elt)

    this.update = () => {
        this.z -= ((starSpeed*100) * delta)
        if (this.z < 1) {
            this.z = randomInt(window.innerWidth*0.75, window.innerWidth)
            this.x = randomInt(-window.innerWidth, window.innerWidth)
            this.y =  randomInt(-window.innerHeight, window.innerHeight)
        }
    }

    this.show = () => {
        this.elt.style.left = 
            map(this.x/this.z,0,1,window.innerWidth/2, window.innerWidth) + 'px'
        this.elt.style.top = 
            map(this.y/this.z,0,1,window.innerHeight/2, window.innerHeight) + 'px'
        this.elt.style.width = map(this.z,0,window.innerWidth,starSize,0) + 'px'
        this.elt.style.height = this.elt.style.width
    }

}