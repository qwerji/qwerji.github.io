const signChains = function() {
    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Events = Matter.Events,
        Bounds = Matter.Bounds;

    const SignChain = function(world, group) {
        // this constructor could really be revised to cut back on the repetitive if's but it works for now
        const signs = []

        for (let i = 2; i < arguments.length; i++) {
            const options = arguments[i],
                color = options.color,
                link = options.link || '',
                ropeSegments = options.ropeSegments || 3,
                segmentLength = options.segmentLength || 1,
                segmentWidth = options.segmentWidth || 1,
                ropeStiffness = options.ropeStiffness || 0.3,
                inset = options.inset || 10,
                boxSize = options.boxSize || signs[signs.length - 1].boxSize || { height: 100, width: 200 },
                position = (function() {
                    if (signs.length) {
                        const pos = signs[signs.length - 1].position
                        return {
                            x: pos.x,
                            y: pos.y + boxSize.height + ropeSegments * segmentLength
                        }
                    } else {
                        return options.position || { x: document.documentElement.clientWidth / 2, y: document.documentElement.clientHeight / 2 }
                    }
                })(),
                ropeApos = {
                    x: (position.x - boxSize.width / 2) + inset,
                    y: (function() {
                        // either start the rope at the start position, or on the previous box
                        if (signs.length) {
                            return position.y + (
                                signs[signs.length - 1].boxSize.height / 2
                            )
                        } else {
                            return position.y
                        }
                    })()
                },
                ropeBpos = {
                    x: (position.x + boxSize.width / 2) - inset,
                    y: (function() {
                        if (signs.length) {
                            return position.y + (
                                signs[signs.length - 1].boxSize.height / 2
                            )
                        } else {
                            return position.y
                        }
                    })()
                };

            const ropeA = Composites.stack(ropeApos.x, ropeApos.y, 1, ropeSegments, 10, 10, function(x, y) {
                return Bodies.rectangle(x, y, segmentLength, segmentWidth, { collisionFilter: { group: group } })
            })

            Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: ropeStiffness, length: 1 })
            // connect the top of the rope
            Composite.add(ropeA, Constraint.create({
                bodyB: ropeA.bodies[0],
                pointB: { x: -(segmentLength / 2), y: 0 },
                bodyA: (function() {
                    // either connect the rope to nothing (the canvas) or the previous box
                    if (signs.length) {
                        return signs[signs.length - 1].box
                    } else {
                        return null
                    }
                })(),
                pointA: (function() {
                    if (signs.length) {
                        const sign = signs[signs.length - 1]
                        return {
                            x: -boxSize.width / 2 + inset,
                            y: boxSize.height / 2
                        }
                    } else {
                        return { x: ropeApos.x, y: ropeApos.y }
                    }
                })(),
                stiffness: ropeStiffness,
                length: 1
            }))

            World.add(world, ropeA)

            const ropeB = Composites.stack(ropeBpos.x, ropeBpos.y, 1, ropeSegments, 10, 10, function(x, y) {
                return Bodies.rectangle(x, y, segmentLength, segmentWidth, { collisionFilter: { group: group } })
            })

            Composites.chain(ropeB, 0.5, 0, -0.5, 0, { stiffness: ropeStiffness, length: 1 })
            Composite.add(ropeB, Constraint.create({
                bodyB: ropeB.bodies[0],
                pointB: { x: -(segmentLength / 2), y: 0 },
                bodyA: (function() {
                    if (signs.length) {
                        return signs[signs.length - 1].box
                    } else {
                        return null
                    }
                })(),
                pointA: (function() {
                    if (signs.length) {
                        const sign = signs[signs.length - 1]
                        return {
                            x: boxSize.width / 2 - inset,
                            y: boxSize.height / 2
                        }
                    } else {
                        return { x: ropeBpos.x, y: ropeBpos.y }
                    }
                })(),
                stiffness: ropeStiffness,
                length: 1
            }))

            World.add(world, ropeB)

            const boxPos = {
                x: ropeApos.x + ((ropeBpos.x - ropeApos.x) / 2),
                y: ropeApos.y + (ropeSegments * segmentLength)
            }

            const box = Bodies.rectangle(boxPos.x, boxPos.y, boxSize.width, boxSize.height, {
                collisionFilter: { group: group },
                setMass: 0.1
            })

            // connect the bottom of each rope to it's sign
            Composite.add(ropeA, Constraint.create({
                bodyA: box,
                pointA: (function() {
                    if (signs.length) {
                        let sign = signs[signs.length - 1]
                        return { x: (sign.boxSize.width / 2 - sign.boxSize.width) + sign.inset, y: -sign.boxSize.height / 2 }
                    } else {
                        return { x: (boxSize.width / 2 - boxSize.width) + inset, y: -boxSize.height / 2 }
                    }
                })(),
                bodyB: ropeA.bodies[ropeA.bodies.length - 1],
                pointB: { x: segmentLength / 2, y: 0 },
                stiffness: ropeStiffness,
                length: 1
            }))

            Composite.add(ropeB, Constraint.create({
                bodyA: box,
                pointA: { x: (boxSize.width - boxSize.width / 2) - inset, y: -boxSize.height / 2 },
                bodyB: ropeB.bodies[ropeB.bodies.length - 1],
                pointB: { x: segmentLength / 2, y: 0 },
                stiffness: ropeStiffness,
                length: 1
            }))

            World.add(world, box)

            signs.push({ position, boxSize, inset, box, ropeApos, ropeBpos, link, color })

        }
        return signs
    }

    // create engine
    const engine = Engine.create(),
        world = engine.world;

    const width = document.documentElement.clientWidth,
        height = document.documentElement.clientHeight;

    // create renderer
    const render = Render.create({
        element: document.getElementById('debug'),
        engine: engine,
        options: {
            width: width,
            height: height
        }
    })

    Render.run(render)

    // create runner
    const runner = Runner.create()
    Runner.run(runner, engine)

    // add bodies
    const group = Body.nextGroup(true)
    
    // custom sign chain constructor called
    // takes the world, the current collision group, and an object for each sign
    const signs = SignChain(world, group, {
        position: { x: width/2, y: 0 },
        boxSize: { width: width-150, height: 175 },
        link: 'http://bentswanson.com',
        color: '#ff7f7f'
    },{
        color: '#ffb27f'
    },{
        color: '#ffe97f'
    },{
        color: '#7fff8e'
    })

    // add mouse control
    const mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                render: {
                    visible: false
                }
            }
        })

    World.add(world, mouseConstraint)

    // add mouseUp event
    Events.on(mouseConstraint, 'mouseup', function(event) {
        const mouse = event.mouse
        for (let i = 0; i < signs.length; i++) {
            if (Bounds.contains(signs[i].box.bounds, mouse.position)) {
                const link = signs[i].link
                if (link !== '') {
                    window.location = link
                }
            }
        }
    })

    // keep the mouse in sync with rendering
    render.mouse = mouse

    const divs = [
        document.getElementById('one'),
        document.getElementById('two'),
        document.getElementById('three'),
        document.getElementById('four')
    ]

    window.requestAnimationFrame(update)
    function update() {
        
        for (let i = 0; i < signs.length; i++) {
            const div = divs[i]
            const sign = signs[i]
            const body = sign.box
            // map the body's attributes to the html element's css
            div.style.transform = "translate( " 
            + (body.position.x - width/2 + 77)
            + "px, "
            + (body.position.y - 88)
            + "px )";
            div.style.transform += "rotate( " + body.angle + "rad )";
            div.style.width = sign.boxSize.width + "px"
            div.style.height = sign.boxSize.height + "px"
            div.style.background = sign.color
        }
        // scary... 
        window.requestAnimationFrame(update)
    }
}
signChains()
