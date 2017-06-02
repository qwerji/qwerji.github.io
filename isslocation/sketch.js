let world,
    iss,
    zoom = 1,
    maxSize = 1024,
    w = 1024,
    h = (() => {
        let wHeight = window.innerHeight
        while(wHeight % 512 !== 0) {
            wHeight++
        }
        if (wHeight > maxSize) {
            return maxSize
        }
        return wHeight
    })()

function preload() {
    world = new World()
    iss = new ISS()
    iss.getLoc(true)
    world.getMap()
}

function setup() {
    if (window.innerWidth < w) {
        createCanvas(w, window.innerHeight)
    } else {
        createCanvas(window.innerWidth, window.innerHeight)
    }
}

function draw() {
    translate(width/2,height/2)
    imageMode(CENTER)
    world.show()
    iss.update()
    iss.show()
    if (frameCount % 100 === 0) iss.getLoc()
}

function World() {

    this.img = null
    this.getMap = (lon=0,lat=0,rot=0,angle=0) => {
        const token = 'pk.eyJ1IjoicXdlcmppIiwiYSI6ImNqM2V3cHJjNTAwMGkyd3BjcWc2ZnFhN24ifQ.x88U-8VoD1o1YVtuTd_gMQ'
        this.img = loadImage(`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lon},${lat},${zoom},${rot},${angle}/${w}x${h}?access_token=${token}`)
    }

    this.show = () => {
        if (this.img) {
            image(this.img,0,0)
            image(this.img,this.img.width,0) 
            image(this.img,-this.img.width,0)
        } else {
            background(1)
        }
    }
}

function ISS(worldSetup) {

    this.img = loadImage('./iss.png')
    this.scl = 0.07

    this.lat = 0
    this.lon = 0

    this.r = 0

    this.speed = 0.01

    this.xdest = () => {
        return mercX(this.lon) - mercX(0)
    }
    
    this.ydest = () => {
        return mercY(this.lat) - mercY(0)
    }

    this.pos = createVector(this.xdest(),this.ydest())

    this.update = () => {
        const dest = createVector(this.xdest(),this.ydest()),
            diff = p5.Vector.sub(dest,this.pos)
        diff.mult(this.speed)
        this.pos.add(diff)
    }

    this.show = () => {
        push()
        translate(this.pos.x,this.pos.y)
        rotate(this.r)
        image(this.img,0,0,this.img.width*this.scl,this.img.height*this.scl)
        pop()
        textFont('Monaco')
        textSize(12)
        fill(255)
        text('ISS', this.pos.x, this.pos.y+40)
        let ll = formatLL(this.lat, this.lon)
        text(ll.lat, this.pos.x, this.pos.y+55)
        text(ll.lon, this.pos.x, this.pos.y+70)
        this.r += 0.002
    }

    this.getLoc = first => {
        const that = this
        fetch('http://api.open-notify.org/iss-now.json').then(data => {
            data.json().then(json => {
                const loc = json.iss_position
                that.lat = parseFloat(loc.latitude)
                that.lon = parseFloat(loc.longitude)
                if (first) {
                    that.pos.x = that.xdest()
                    that.pos.y = that.ydest()
                }
            })
        })
    }

}

function mercX(lon=0) {
    lon = radians(lon)
    let a = (256/PI) * pow(2, zoom),
        b = lon + PI
    return a * b
}

function mercY(lat=0) {
    lat = radians(lat)
    let a = (256/PI) * pow(2, zoom),
        b = tan((PI/4)+(lat/2)),
        c = PI - log(b)
    return a * c
}

function formatLL(lat, lon) {
    let latStr = '', lonStr = ''
    if (lat < 0) {
        latStr += Math.abs(lat) + '° S'
    } else {
        latStr += lat + '° N'
    }
    if (lon < 0) {
        lonStr += Math.abs(lon) + '° W'
    } else {
        lonStr += lon + '° E'
    }
    return { lat: latStr, lon: lonStr }
}
