(() => {
    // Grab document elements
    const navButton = document.getElementsByClassName('navButton')[0],
        nav = document.getElementsByTagName('nav')[0],
        brackets = document.getElementsByClassName('bracket'),
        hamburger = document.getElementsByClassName('hamburger')[0],
        loadingScreen = document.getElementsByClassName('loading')[0],
        sections = document.getElementsByTagName('section'),
        main = document.getElementsByTagName('main')[0],
        main2 = document.getElementsByTagName('main')[1],
        snail = document.getElementById('snail'),
        soundcloud = document.getElementById('soundcloud'),
        bandcamp = document.getElementById('bandcamp'),
        homeLink = document.getElementById('homeLink'),
        projectLink = document.getElementById('projectLink'),
        projectButtons = document.getElementsByClassName('projectButtons'),
        sectionHash = {}, // Stores the pointers to each section (each square)
        sectionLists = { // Stores the orderings for each breakpoint
            small: ["logo", "whoami", "softwareDev", "projects", "musician", "space8", "contact"],
            medium: ["logo", "whoami", "softwareDev", "projects", "contact", "musician"],
            all: ["logo", "photo", "space3", "whoami", "musician", "projects", "softwareDev", "space8", "space9", "space10", "contact", "space12"],
            isACard: {"logo":true,"photo":true,"whoami":true,"musician":true,"softwareDev":true,"food":true,"done-for":true,"snail-fantasy":true,"blackbelts":true}
        }

    // Hides the ugly setup for the card flips
    setTimeout(() => {
        snail.classList.add('animate')
        loadingScreen.classList.add('doneLoading')
        setTimeout(() => {
            loadingScreen.style.display = 'none'
        }, 600)
    }, 500)

    // Adds the section elements to the hash
    for (let i = 0; i < sections.length; i++) {
        sectionHash[sections[i].id] = sections[i]
    }

    // Set up card flip event listener
    for (let _section in sectionHash) {
        // Apply the listener only if it is a card
        if (sectionLists.isACard[_section]) {
            const section = sectionHash[_section]
            applyCardFlipListener(section)
        }
    }
    function applyCardFlipListener(section) {
        section.addEventListener("click", event => {
            const classList = section.children[0].classList
            classList.contains("flipped") ? classList.remove("flipped") : classList.add("flipped")
        })
    }

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
            document.body.classList.remove('noScroll')
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
            document.body.classList.add('noScroll')
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

    soundcloud.onmouseover = () => {
        soundcloud.src = 'images/soundcloud-hover.svg'
    }
    soundcloud.onmouseout = () => {
        soundcloud.src = 'images/soundcloud.svg'
    }

    bandcamp.onmouseover = () => {
        bandcamp.src = 'images/bandcamp-hover.svg'
    }
    bandcamp.onmouseout = () => {
        bandcamp.src = 'images/bandcamp.svg'
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

    sectionHash['projects'].onclick = () => {
        main.classList.add('noScroll')
        main2.classList.add('flyIn')
    }

    homeLink.onclick = () => {
        main2.classList.remove('flyIn')
        main.classList.remove('noScroll')
        navOpen = true
        navButton.onclick()
    }
    projectLink.onclick = () => {
        sectionHash['projects'].onclick()
        navOpen = true
        navButton.onclick()
    }

})()
