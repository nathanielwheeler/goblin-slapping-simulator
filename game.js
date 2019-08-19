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
                tagName: "#palm-oil",
                description: "Hand oil that add a little sting to your slaps.  Increases the power of normal slaps.",
                template: {
                    unequipped: `<h3>Palm Oil</h3><p>Hand oil that add a little sting to your slaps. Increases the power of normal slaps.</p><button onclick="equip('palmOil')" type="button" class="btn btn-secondary">Equip</button>`,
                    equipped: `<h3>Palm Oil</h3><p>Hand oil that add a little sting to your slaps. Increases the power of normal slaps.</p><button onclick="unequip('palmOil')" type="button" class="btn btn-secondary">Unequip</button>`,
                },
            },
            cheekGuards: {
                name: "Cheek Guards",
                equipped: false,
                modBase: 0.5,
                tagName: "#cheek-guards",
                description: "Little pillows to protect against slaps.  Increases slap defense.",
                template: {
                    unequipped: `<h3>Cheek Guards</h3><p>Little pillows to protect against slaps. Increases slap defense.</p><button onclick="equip('cheekGuards')" type="button" class="btn btn-secondary">Equip</button>`,
                    equipped: `<h3>Cheek Guards</h3><p>Little pillows to protect against slaps. Increases slap defense.</p><button onclick="unequip('cheekGuards')" type="button" class="btn btn-secondary">Unequip</button>`,
                },
            },
            amuletOfTheSlapmaster: {
                name: "Amulet of the Slapmaster",
                equipped: false,
                modBase: 1111,
                tagName: "#amulet-of-the-slapmaster",
                description: "This necklace contains the energy of every Master of Slaps. Given to Slapmaster by his father, it is all he has left of his family.  Increases megaslap power.",
                template: {
                    unequipped: `<h3>Amulet of the Slapmaster</h3><p>This necklace contains the energy of every Master of Slaps. Given to Slapmaster by his father, it is all he has left of his family. Increases megaslap power.</p><button onclick="equip('amuletOfTheSlapmaster')" type="button" class="btn btn-secondary">Equip</button>`,
                    equipped: `<h3>Amulet of the Slapmaster</h3><p>This necklace contains the energy of every Master of Slaps. Given to Slapmaster by his father, it is all he has left of his family. Increases megaslap power.</p><button onclick="unequip('amuletOfTheSlapmaster')" type="button" class="btn btn-secondary">Unequip</button>`,
                },
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
    let itemTag = equippedItem.tagName
    equippedItem.equipped = true

    document.querySelector(itemTag).innerHTML = equippedItem.template.equipped
}
function unequip(item) {
    let unequippedItem = character.player.items[item]
    let itemTag = unequippedItem.tagName
    unequippedItem.equipped = false

    document.querySelector(itemTag).innerHTML = unequippedItem.template.unequipped
}

function slap(slapType) {
    let slapAttack = slapType
    let damageInflicted = enemyDamageTaken(slapAttack)
    character.enemy.health.current -= damageInflicted
    if (character.enemy.health.current < character.enemy.health.min) {
        character.enemy.health.current = 0
    }
    character.player.health.current -= playerDamageTaken()
    if (character.player.health.current < character.player.health.min) {
        character.player.health.current = 0
    }

    draw()
}
function enemyDamageTaken(slapType) {
    let damageBase = character.player.attacks[slapType]
    let damageMod = 1
    if (slapType === "slap" && character.player.items.palmOil.equipped === true) {
        damageMod *= character.player.items.palmOil.modBase
    }
    if (slapType === "megaslap" && character.player.items.amuletOfTheSlapmaster === true) {
        damageMod *= character.player.items.amuletOfTheSlapmaster.modBase
    }
    return damageBase * damageMod
}
function playerDamageTaken() {
    let damageBase = character.enemy.attack
    let damageMod = 1
    if (character.player.items.cheekGuards.equipped === true) {
        damageMod *= character.player.items.cheekGuards.modBase
    }
    return damageBase * damageMod
}

function draw() {
    document.querySelector("#player-health").innerHTML = `<div style="width: ${(100 * character.player.health.current / character.player.health.max)}%" class="progress-bar" role="progressbar" aria-valuenow="${character.player.health.current}" aria-valuemin="0" aria-valuemax="1000">${character.player.health.current}</div>`
    document.querySelector("#enemy-health").innerHTML = `<div style="width: ${(100 * character.enemy.health.current / character.enemy.health.max)}%" class="progress-bar" role="progressbar" aria-valuenow="${character.enemy.health.current}" aria-valuemin="0" aria-valuemax="200">${character.enemy.health.current}</div>`
}
draw()