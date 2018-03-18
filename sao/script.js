let box = new SAOAlert({
    title: "Invite",
    text: "Invite player to your party?",
    onAccept: () => {
        console.log("Accepted")
    },
    onReject: () => {
        console.log("Rejected")
    }
})

document.querySelector(".open").addEventListener("click", e => {
    box.present()
})