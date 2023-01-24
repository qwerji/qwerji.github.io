// r/dailyprogrammer intermediate challenge #2
// https://www.reddit.com/r/dailyprogrammer/comments/pjbuj/intermediate_challenge_2/

// Challenge:
// create a short text adventure that will call the user by their name. 
// The text adventure should use standard text adventure commands ("l, n, s, e, i, etc.").
// for extra credit, make sure the program doesn't fault, quit, glitch, fail, 
// or loop no matter what is put in, even empty text or spaces. These will be tested rigorously!

// Notes:
// My plan is to create a sort of "pseudo-console" in the browser, and create
// a system of input and outputs for the game. I could just use the JavaScript console,
// but thats not as fun...

// Commands to take care of:
//     look (up,down,left,right)
//     go (n,s,e,w)
//     inspect (thing)
//     get (thing)

// Story Idea:
// 1. You are trapped in a dungeon, chained to a wall.
//     Options: 
//         look (explains what is seen in the cell),
//         go (does nothing, you're chained to the wall),
//         get:
//             food - eat food
//             mouse - runs away
//         inspect:
//             chain - weak link -> lets you out of bonds
//             mouse - ...
//             food - ...
// 2. Let out of chains
//     Options:
//         look (same)
//         go:
//             n - to door
//             s - wall is behind you
//             e - nothing
//             w - window
// 3. Window
//     Options:
//         inspect window - ...
//         look w - same as inspect window
// 4. Door
//     Options:
//         inspect:
//             door - ...
//         
// This is a pretty lame game, but its more of a proof-of-concept.
// Addendum - I'm just going to use inspect for looking, it's much 
// more convenient than getting both of them to work.
// Second Addendum - This is taking way to long so I am removing the window location

const outputElt = document.querySelector('main pre'),
    inputElt = document.querySelector('main input'),
    form = document.querySelector('main form'),
    savedInputs = [],
    game = {
        situations: {
            chained: {
                options: {
                    go: {
                        default: () => {
                            printToConsole("You can't go anywhere, you are chained to the wall.");
                        }
                    },
                    get: {
                        food: () => {
                            if (!gameState.foodEaten) {
                                printToConsole("You eat the food. It is disgusting, but nourishing.");
                                gameState.foodEaten = true;
                            } else {
                                printToConsole("You have already eaten your food...");
                            }
                        },
                        mouse: () => {
                            if (!gameState.mouseScared) {
                                printToConsole("You go to grab the mouse, but it scampers away.");
                                gameState.mouseScared = true;
                            } else {
                                printToConsole("The mouse has since scampered out of the cell through a crack in the wall, just big enough to be scampered through.");
                            }
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    },
                    inspect: {
                        mouse: () => {
                            if (!gameState.mouseScared) {
                                printToConsole('You look at the mouse, and the mouse looks back curiously.');
                            } else {
                                printToConsole("The mouse has since scampered out of the cell through a crack in the wall, just big enough to be scampered through.");
                            }
                        },
                        food: () => {
                            if (!gameState.foodEaten) {
                                printToConsole('The food appears to be a bland porridge.');
                            } else {
                                printToConsole('You stare at your empty food bowl, longingly.');
                            }
                        },
                        window: () => {
                            printToConsole('The small window on the west wall has bars over it. Moonlight streams through onto the cell floor.');
                        },
                        door: () => {
                            printToConsole('The large steel door on the north wall looms over you. A keyhole reveals a small pinhole of candle-lit hallway.');
                        },
                        chains: () => {
                            gameState.location = 'unchained';
                            printToConsole('You examine the chains binding you, and you notice that they are actually quite flimsy. You easily bend them off of your wrists and they clang to the floor.');
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    }
                }
            },
            unchained: {
                options: {
                    go: {
                        north: () => {
                            gameState.location = 'door';
                            printToConsole('You walk up the door on the north wall. It is riddled with rivets and support beams, and has a small keyhole.');
                        },
                        south: () => {
                            printToConsole('There is a cold, stone wall behind you.');
                        },
                        east: () => {
                            printToConsole('There is a cold, stone wall to the east.');
                        },
                        west: () => {
                            printToConsole('You walk up to the window, and peer out into the night. The moon illuminates a rolling moor that extends farther than you can see. Nothing peaks your interest so you walk back to the center of the cell.');
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    },
                    get: {
                        food: () => {
                            if (!gameState.foodEaten) {
                                printToConsole("You eat the food. It is disgusting, but nourishing.");
                                gameState.foodEaten = true;
                            } else {
                                printToConsole("You have already eaten your food...");
                            }
                        },
                        mouse: () => {
                            if (!gameState.mouseScared) {
                                printToConsole("You go to grab the mouse, but it scampers away.");
                                gameState.mouseScared = true;
                            } else {
                                printToConsole("The mouse has since scampered out of the cell through a crack in the wall, just big enough to be scampered through.");
                            }
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    },
                    inspect: {
                        mouse: () => {
                            if (!gameState.mouseScared) {
                                printToConsole('You look at the mouse, and the mouse looks back curiously.');
                            } else {
                                printToConsole("The mouse has since scampered out of the cell through a crack in the wall, just big enough to be scampered through.");
                            }
                        },
                        food: () => {
                            if (!gameState.foodEaten) {
                                printToConsole('The food appears to be a bland porridge.');
                            } else {
                                printToConsole('You stare at your empty food bowl, longingly.');
                            }
                        },
                        window: () => {
                            printToConsole('The small window on the west wall has bars over it. Moonlight streams through onto the cell floor.');
                        },
                        door: () => {
                            printToConsole('The large steel door on the north wall looms over you. A keyhole reveals a small pinhole of candle-lit hallway.');
                        },
                        chain: () => {
                            gameState.location = 'unchained';
                            printToConsole('You examine the chains binding you, and you notice that they are actually quite flimsy. You easily bend them off of your wrists and the clang to the floor.');
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    }
                }
            },
            door: {
                options: {
                    go: {
                        north: () => {
                            printToConsole('You are already at the door.');
                        },
                        south: () => {
                            gameState.location = 'unchained';
                            printToConsole('You walk back to the middle of the room.');
                        },
                        east: () => {
                            printToConsole('There is a cold, stone wall to the east.');
                        },
                        west: () => {
                            printToConsole('You walk up to the window, and peer out into the night. The moon illuminates a rolling moor that extends farther than you can see. Nothing peaks your interest so you walk back to the door.');
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    },
                    get: {
                        food: () => {
                            if (!gameState.foodEaten) {
                                printToConsole("You eat the food. It is disgusting, but nourishing.");
                                gameState.foodEaten = true;
                            } else {
                                printToConsole("You have already eaten your food...");
                            }
                        },
                        mouse: () => {
                            if (!gameState.mouseScared) {
                                printToConsole("You go to grab the mouse, but it scampers away.");
                                gameState.mouseScared = true;
                            } else {
                                printToConsole("The mouse has since scampered out of the cell through a crack in the wall, just big enough to be scampered through.");
                            }
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    },
                    inspect: {
                        mouse: () => {
                            if (!gameState.mouseScared) {
                                printToConsole('You look at the mouse, and the mouse looks back curiously.');
                            } else {
                                printToConsole("The mouse has since scampered out of the cell through a crack in the wall, just big enough to be scampered through.");
                            }
                        },
                        food: () => {
                            if (!gameState.foodEaten) {
                                printToConsole('The food appears to be a bland porridge.');
                            } else {
                                printToConsole('You stare at your empty food bowl, longingly.');
                            }
                        },
                        window: () => {
                            printToConsole('The small window on the west wall has bars over it. Moonlight streams through onto the cell floor.');
                        },
                        door: () => {
                            printToConsole('The large steel door on the north wall looms over you. A keyhole reveals a small pinhole of candle-lit hallway.');
                        },
                        keyhole: () => {
                            printToConsole('You lean down and inspect the keyhole on the door, to find that the door just swings open. You stroll out of the cell, out onto the moor...');
                            setTimeout(() => {
                                printSequence([
                                    '                           ___ _  _ ___',
                                    '                          | __| \\| |   \\',
                                    '                          | _|| .` | |) |',
                                    '                          |___|_|\\_|___/',
                                    '--------------------- type reset to play again ----------------------'
                                ]);
                            }, 5000);
                        },
                        default: word => {
                            printToConsole(`You can't ${word}.`);
                        }
                    }
                }
            }
        }
    };

let gameState;
let savedInputsIdx = 0;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!inputElt.value || inputElt.value.length <= 0) return;
    printToConsole(`> ${inputElt.value}`);
    doThing(inputElt.value);
    savedInputs.splice(0, 0, inputElt.value);
    this.reset();
})

form.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        inputElt.value = savedInputs[savedInputsIdx] || inputElt.value;
        savedInputsIdx++;
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        inputElt.value = savedInputs[savedInputsIdx] || inputElt.value;
        savedInputsIdx--;
    }
    if (savedInputsIdx < 0) {
        savedInputsIdx = 0;
    } else if (savedInputsIdx >= savedInputs.length) {
        savedInputsIdx = savedInputs.length - 1;
    }
});

function printToConsole(text) {
    outputElt.textContent += `\n${text}`;
}

let sequencePrinter;
function printSequence(sequence) {
    let i = 0;
    printToConsole(sequence[i]);
    i++;
    clearInterval(sequencePrinter);
    sequencePrinter = setInterval(() => {
        printToConsole(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(sequencePrinter);
        }
    }, 1000);
}

function start() {
    printSequence([
        '  __  __ _   _ _  _ ___   _   _  _ ___    ___  _   _ ___ ___ _____ ',
        ' |  \\/  | | | | \\| |   \\ /_\\ | \\| | __|  / _ \\| | | | __/ __|_   _|',
        ' | |\\/| | |_| | .` | |) / _ \\| .` | _|  | (_) | |_| | _|\\__ \\ | |  ',
        ' |_|  |_|\\___/|_|\\_|___/_/ \\_\\_|\\_|___|  \\__\\_\\\\___/|___|___/ |_|  ',
        '---------------------------------------------------------------------',
        'Commands: inspect (thing), go (north, south, east, west), get (thing), reset',
        '---------------------------------------------------------------------',
        `You find yourself sitting on a cold, damp, cobblestone floor, chains binding you to the wall of a dimly lit room. You can see a door to the north, a window to the east, some food in a dish next to you, and a small mouse sniffing around in the middle of the room.`
    ]);
}

function reset() {
    outputElt.textContent = "";
    gameState = {
        foodEaten: false,
        mouseScared: false,
        location: 'chained'
    };
    start();
}

function doThing(command) {
    const comms = command.split(' ');
    const response1 = game.situations[gameState.location].options[comms[0]];
    if (!response1) {
        if (comms[0] == 'reset') {
            reset();
        } else {
            printToConsole(`You can't ${command}.`);
        }
    } else {
        const response2 = response1[comms[1]];
        if (!response2) {
            response1.default(command);
        } else {
            response2();
        }
    }
}

window.onload = reset();

window.addEventListener('click', () => {
    inputElt.focus();
});

// So this ended up being a lot of repeated code, and eventually I want to create
// a better organization system for each option function. But it works for now.
