// server/modules/Entities.ts
enum Rarity {
    Common = 1,
    Uncommon,
    Rare,
    Legendary,
    Mythic
}

export interface Entity {
    id: string; // Internal entity name
    name: string; // Actual entity name
    description: string; // Short description of the entity
    rarity: Rarity; // Rarity Type (Rarity enum)
    prob: [min: number, max: number]; // Probability for this entity to randomly appear (1 - 10 000)
    canSpawn: boolean; // Whether the entity can randomly spawn
}

const entities: Entity[] = [
    {
        id: "error",
        name: "Internal error",
        description: "You shouldn't be getting this..?",
        rarity: Rarity.Legendary,
        prob: [0, 0],
        canSpawn: false
    },
    {
        id: "test",
        name: "test name",
        description: "just a test entity",
        rarity: Rarity.Rare,
        prob: [0, 5000],
        canSpawn: true
    }
]

export function getRandom(): Entity {
    const randint = math.random(1, 10000) / 10000;

    entities.forEach((entity) => {
        const [min, max] = entity.prob;

        if (randint >= min && randint <= max)
            return entity;
    })
    return entities[0]; // Shouldn't be happening but, in case it does, return error entity
}
