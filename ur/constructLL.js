function constructLL() {
    // Construct the linked list board

    // Player 1 starting area
    const s1p1 = new Square(this,'p1')
    s1p1.elt.style.left = 0 + 'px'
    s1p1.elt.style.top = 225 + 'px'
    const s2p1 = new Square(this,'p1')
    s2p1.elt.style.left = 0 + 'px'
    s2p1.elt.style.top = 150 + 'px'
    s1p1.next = s2p1
    const s3p1 = new Square(this,'p1')
    s3p1.elt.style.left = 0 + 'px'
    s3p1.elt.style.top = 75 + 'px'
    s2p1.next = s3p1
    const s4p1 = new Square(this,'p1',true)
    s4p1.elt.style.left = 0 + 'px'
    s4p1.elt.style.top = 0 + 'px'
    s3p1.next = s4p1
    this.p1start = s1p1

    // Player 2 starting area
    const s1p2 = new Square(this,'p2')
    s1p2.elt.style.left = 150 + 'px'
    s1p2.elt.style.top = 225 + 'px'
    const s2p2 = new Square(this,'p2')
    s2p2.elt.style.left = 150 + 'px'
    s2p2.elt.style.top = 150 + 'px'
    s1p2.next = s2p2
    const s3p2 = new Square(this,'p2')
    s3p2.elt.style.left = 150 + 'px'
    s3p2.elt.style.top = 75 + 'px'
    s2p2.next = s3p2
    const s4p2 = new Square(this,'p2',true)
    s4p2.elt.style.left = 150 + 'px'
    s4p2.elt.style.top = 0 + 'px'
    s3p2.next = s4p2
    this.p2start = s1p2

    // War zone
    const w1 = new Square(this,'war')
    w1.elt.style.left = 75 + 'px'
    w1.elt.style.top = 0 + 'px'
    s4p1.next = w1
    s4p2.next = w1
    const w2 = new Square(this,'war')
    w2.elt.style.left = 75 + 'px'
    w2.elt.style.top = 75 + 'px'
    w1.next = w2
    const w3 = new Square(this,'war')
    w3.elt.style.left = 75 + 'px'
    w3.elt.style.top = 150 + 'px'
    w2.next = w3
    const w4 = new Square(this,'war',true)
    w4.elt.style.left = 75 + 'px'
    w4.elt.style.top = 225 + 'px'
    w3.next = w4
    const w5 = new Square(this,'war')
    w5.elt.style.left = 75 + 'px'
    w5.elt.style.top = 300 + 'px'
    w4.next = w5
    const w6 = new Square(this,'war')
    w6.elt.style.left = 75 + 'px'
    w6.elt.style.top = 375 + 'px'
    w5.next = w6
    const w7 = new Square(this,'war')
    w7.elt.style.left = 75 + 'px'
    w7.elt.style.top = 450 + 'px'
    w6.next = w7
    const w8 = new Square(this,'war')
    w8.elt.style.left = 75 + 'px'
    w8.elt.style.top = 525 + 'px'
    w7.next = w8
    w8.next = {}

    // Ending zones
    const e1p1 = new Square(this,'p1')
    e1p1.elt.style.left = 0 + 'px'
    e1p1.elt.style.top = 525 + 'px'
    const e2p1 = new Square(this,'p1',true)
    e2p1.elt.style.left = 0 + 'px'
    e2p1.elt.style.top = 450 + 'px'
    e1p1.next = e2p1

    const e1p2 = new Square(this,'p2')
    e1p2.elt.style.left = 150 + 'px'
    e1p2.elt.style.top = 525 + 'px'
    const e2p2 = new Square(this,'p2',true)
    e2p2.elt.style.left = 150 + 'px'
    e2p2.elt.style.top = 450 + 'px'
    e1p2.next = e2p2

    w8.next['p1'] = e1p1
    w8.next['p2'] = e1p2
}