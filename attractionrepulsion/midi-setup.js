// MIDI input
// This is only configured for the KORG nanokontrol2
// Particle mass variance? - slider

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
}

const MIDIfunctions = {
    // Alpha - slider 0
    0: val => alpha = map(val, 0, 127, 0, 360),
    // Particle count - slider 1
    1: val => {
        const amount = floor(map(val, 0, 127, 0, 500))
        if (particles.length > amount) {
            while (particles.length > amount) {
                particles.pop()
            }
        } else {
            while (particles.length < amount) {
                particles.push(new Particle())
            }
        }
    },
    // Gravitational constant - slider 2
    2: val => {
        G = map(val, 0, 127, 0.01, 100)
    },
    // Reset - stop button
    42: val => {
        particles = []
        attractors = []
        background(5)
    },
    // Show/hide attractors - record button 1
    64: val => {
        showAttr = !!val
    },
    // Place attractor/repulsor - global record button
    45: val => {
        attractorBool = !!val
    },
    // Trails/No trails - mute button 1
    48: val => {
        trails = !!val
    }
}

function updateMIDI(m) {
    const funct = MIDIfunctions[m.data[1]]
    if (funct) funct(m.data[2])
}

function onMIDISuccess(midi) {
    console.log('MIDI Access Successful')
    const inputs = midi.inputs.values()
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = updateMIDI
    }
}

function onMIDIFailure(e) {
    console.log(e)
}