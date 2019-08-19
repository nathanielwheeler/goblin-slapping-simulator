let character = {
    player: {
        name: "Slapmaster, master of slaps",
        health: {
            max: 1000,
            min: 0,
            current: 1000,
        },
        attacks: {
            slap: 20,
            backslap: 25,
            megaslap: 100,
        },
        items: {
            palmOil: {
                name: "Palm Oil",
                equipped: false,
                modBase: 1.5,
                modType: "player.attacks.slap",
                description: "Hand oil that add a little sting to your slaps.  Increases the power of normal slaps.",
            },
            cheekGuards: {
                name: "Cheek Guards",
                equipped: false,
                modBase: 0.5,
                modType: "enemy.attack",
                description: "Little pillows to protect against slaps.  Increases slap defense.",
            },
            amuletOfTheSlapmaster: {
                name: "Amulet of the Slapmaster",
                equipped: false,
                modBase: 1111,
                modType: "player.attacks.megaslap",
                description: "This necklace contains the energy of every Master of Slaps. Given to Slapmaster by his father, it is all he has left of his family.  Increases megaslap power.",
            },
        },
    },

    enemy: {
        name: "Tenderpalm, weak of wrist",
        health: {
            max: 200,
            min: 0,
            current: 200,
        },
        attack: 10,
        description: "An infamous criminal mastermind responsible for the deaths of Slapmaster's family."
    },
}

function equip(item) {
    let equippedItem = character.player.items[item]
    let modTarget = equippedItem.modType
    character[modTarget] *= equippedItem.modBase
}

function slap(slapType) {
    character.enemy.health.current -= character.player.attacks[slapType]
    if (character.enemy.health.current < character.enemy.health.min) {
        character.enemy.health.current = 0
    }
    character.player.health.current -= character.enemy.attack
    if (character.player.health.current < character.player.health.min) {
        character.player.health.current = 0
    }

    draw()
}

function draw() {
    document.querySelector("#player-health").innerHTML = `<div style="width: ${(100 * character.player.health.current / character.player.health.max)}%" class="progress-bar" role="progressbar" aria-valuenow="${character.player.health.current}" aria-valuemin="0" aria-valuemax="1000">${character.player.health.current}</div>`
    document.querySelector("#enemy-health").innerHTML = `<div style="width: ${(100 * character.enemy.health.current / character.enemy.health.max)}%" class="progress-bar" role="progressbar" aria-valuenow="${character.enemy.health.current}" aria-valuemin="0" aria-valuemax="200">${character.enemy.health.current}</div>`


}
draw()