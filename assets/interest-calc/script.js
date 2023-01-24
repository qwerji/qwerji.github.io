// r/dailyprogrammer easy challenge #2
// https://www.reddit.com/r/dailyprogrammer/comments/pih8x/easy_challenge_2/

// Challenge:
// create a calculator application that has use in your life. It might be an interest calculator, 
// or it might be something that you can use in the classroom. For example, if you were in physics 
// class, you might want to make a F = M * A calc.

const principalElt = document.querySelector('.principal'),
    rateElt = document.querySelector('.rate'),
    timeElt = document.querySelector('.time'),
    timeUnitsElt = document.querySelector('.time-units'),
    addPrincipalElt = document.querySelector('.add-principal'),
    form = document.querySelector('.calculator'),
    answerElt = document.querySelector('.answer span'),
    addLabelElt = document.querySelector('form div label')

function calculate() {
    const principal = parseFloat(principalElt.value),
        rate = parseFloat(rateElt.value)/100,
        timeUnits = timeUnitsElt.value,
        addPrincipal = addPrincipalElt.checked

    let time = parseFloat(timeElt.value)

    if (!addPrincipal) {
        addLabelElt.style.textDecoration = 'line-through'
    } else {
        addLabelElt.style.textDecoration = 'none'
    }

    if (!principal ||
        !rate      ||
        !time      ||
        !timeUnits
    ) {
        answerElt.textContent = '0.00'
        return
    }

    switch (timeUnits) {
        case 'days':
            time /= 365
            break
        case 'weeks':
            time /= 52
            break
        case 'months':
            time /= 12
            break
        default:
            break
    }

    answerElt.textContent = (principal*((addPrincipal ? 1 : 0)+(rate*time))).toFixed(2)
}
calculate()

principalElt.addEventListener('change', calculate)
rateElt.addEventListener('change', calculate)
timeElt.addEventListener('change', calculate)
timeUnitsElt.addEventListener('change', calculate)
addPrincipalElt.addEventListener('change', calculate)
form.addEventListener('submit', e => {
    e.preventDefault()
    calculate()
})

