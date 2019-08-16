let player = {
    name: "Slapmaster, master of slaps",
    health: 1000,
    attacks: {
        slap: 20,
        backslap: 30,
        megaslap: 100,
    },
    items: {
        cheekguards: {
            name: "Cheek Guards",
            modBase: 5,
            modType: "enemy.attack",
            description: "Little pillows that tie onto your cheeks.  Guards against slap attacks."
        },
        palmOil: {
            name: "Palm Oil",
            modBase: 1.5,
            modType: "player.attacks"
        },
    }

}
let enemy = {
    name: "Tenderpalm, weak of wrist",
    health: 200,
    attack: 10
}

function slap(slapType) {

    goblin.health -= player.attacks[slapType]
    player.health -= goblin.attack
    draw()
}
function draw() {
    document.querySelector("#goblin-health").textContent = `helth: ${goblin.health}`
    document.querySelector("#player-health").textContent = `you're helth: ${player.health}`
}