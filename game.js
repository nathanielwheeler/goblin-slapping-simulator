let goblin = {
    name: "gerblin",
    health: 1000000000,
}
function slap() {
    goblin.health--
    draw()
}
function draw() {
    document.querySelector("#health").textContent = `helth: ${goblin.health}`
}