const MESSAGES = {
    'wumpus': 'You can smell something horrible nearby.',
    'pit': 'You can hear the sound of rushing wind.'
}

function appendText(txt) {
    infoText += txt + '\n'
}

function resetText() {
    infoText = ''
}

function setText(txt) {
    infoText = txt
}