// shared/types/Entities.ts
export enum Rarity {
	Common = 1,
	Uncommon,
	Rare,
	Legendary,
	Mythic,
}

export interface Entity {
	id: string; // Internal entity name
	name: string; // Actual entity name
	description: string; // Short description of the entity
	rarity: Rarity; // Rarity Type (Rarity enum)
	prob: [min: number, max: number]; // Probability for this entity to randomly appear (1 - 10 000)
	canSpawn: boolean; // Whether the entity can randomly spawn
	imageId: string;
}
