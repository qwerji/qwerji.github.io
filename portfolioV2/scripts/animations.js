(() => {
    // Grab document elements
    const navButton = document.getElementsByClassName('navButton')[0],
        nav = document.getElementsByTagName('nav')[0],
        brackets = document.getElementsByClassName('bracket'),
        hamburger = document.getElementsByClassName('hamburger')[0],
        loadingScreen = document.getElementsByClassName('loading')[0],
        sections = document.getElementsByTagName('section'),
        main = document.getElementsByTagName('main')[0],
        snail = document.getElementById('snail'),
        sectionHash = {}, // Stores the pointers to each section (each square)
        sectionLists = { // Stores the orderings for each breakpoint
            small: ["logo", "whoami", "softwareDev", "projects", "musician", "space8", "contact"],
            medium: ["logo", "whoami", "softwareDev", "projects", "contact", "musician"],
            all: ["logo", "photo", "space3", "whoami", "musician", "projects", "softwareDev", "space8", "space9", "space10", "contact", "space12"],
            isACard: {"logo":true,"photo":true,"whoami":true,"musician":true,"softwareDev":true}
        }

    // Adds the section elements to the hash
    for (let i = 0; i < sections.length; i++) {
        sectionHash[sections[i].id] = sections[i]
    }

    // Set up card flip event listener
    for (let _section in sectionHash) {
        // Apply the listener/cursor change only if it is a card
        if (sectionLists.isACard[_section]) {
            const section = sectionHash[_section]
            applyCardFlipListener(section)
            section.style.cursor = "pointer"
        }
    }
    function applyCardFlipListener(section) {
        section.addEventListener("click", event => {
            const classList = section.children[0].classList
            classList.contains("flipped") ? classList.remove("flipped") : classList.add("flipped")
        })
    }

    // Hides the ugly setup for the card flips
    setTimeout(() => {
        snail.classList.add('animate')
        loadingScreen.classList.add('doneLoading')
        setTimeout(() => {
            loadingScreen.style.display = 'none'
        }, 600)
    }, 500)

    // Handles the animations for the navigation opening and closing
    let navOpen = false
    navButton.onclick = () => {
        if (navOpen) {
            navOpen = false
            nav.classList.remove('open')
            brackets[0].classList.remove('bracketSpinLeft')
            brackets[1].classList.remove('bracketSpinRight')
            hamburger.src = 'images/hamburger.svg'
            hamburger.style.width = '21px'
            hamburger.style.height = '21px'
            navButton.classList.remove('openNavButton')
        } else {
            navOpen = true
            nav.classList.add('open')
            brackets[0].classList.add('bracketSpinLeft')
            brackets[1].classList.add('bracketSpinRight')
            hamburger.src = 'images/close.svg'
            hamburger.style.width = '15px'
            hamburger.style.height = '15px'
            navButton.classList.add('openNavButton')
            navButton.classList.remove('navButtonHover')
        }
    }

    // Mouse hover events for nav tab
    navButton.onmouseover = () => {
        brackets[0].classList.add('bracketHoverLeft')
        brackets[1].classList.add('bracketHoverRight')
        if (!navOpen) {
            navButton.classList.add('navButtonHover')
        }
    }
    navButton.onmouseout = () => {
        brackets[0].classList.remove('bracketHoverLeft')
        brackets[1].classList.remove('bracketHoverRight')
        navButton.classList.remove('navButtonHover')
    }

    // Helper function to remove all child nodes from a DOM element
    function removeAllChildren(parent) {
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }

    // Appends the correct sections in the correct order by ID based on the sectionHash
    function addSections(sectionElts, sectionList, parent) {
        for (var i = 0; i < sectionList.length; i++) {
            const node = sectionElts[sectionList[i]]
            parent.appendChild(node)
        }
    }

    // This code handles the proper sections getting appended at the correct screensize
    // The bools make it so the nodes are only reset on breakpoints (rather than constantly)
    let smallDidResize = false,
        mediumDidResize = false,
        allDidResize = false
    window.onresize = () => {
        if (window.innerWidth <= 590) {
            if (!smallDidResize) {
                removeAllChildren(main)
                smallDidResize = true
                mediumDidResize = false
                allDidResize = false
                addSections(sectionHash, sectionLists.small, main)
            }
        } else if (window.innerWidth <= 1024) {
            if (!mediumDidResize) {
                removeAllChildren(main)
                mediumDidResize = true
                smallDidResize = false
                allDidResize = false
                addSections(sectionHash, sectionLists.medium, main)
            }
        } else {
            if (!allDidResize) {
                removeAllChildren(main)
                allDidResize = true
                smallDidResize = false
                mediumDidResize = false
                addSections(sectionHash, sectionLists.all, main)
            }
        }
    }
    // Set the initial state
    window.onresize()

})()
