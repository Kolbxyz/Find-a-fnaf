// shared/types/Entities.ts
export enum Rarity {
	Common = 1,
	Uncommon,
	Rare,
	Legendary,
	Mythic,
}

export const RarityColor: Color3[] = [
	new Color3(1, 1, 1),
	new Color3(0.04, 0.73, 0.25),
	new Color3(0, 0.33, 1),
	new Color3(1, 0.92, 0),
	new Color3(0.78, 0.15, 0.02),
];

export interface Entity {
	id: string; // Internal entity name
	name: string; // Actual entity name
	description: string; // Short description of the entity
	rarity: Rarity; // Rarity Type (Rarity enum)
	prob: [min: number, max: number]; // Probability for this entity to randomly appear (1 - 10 000)
	canSpawn: boolean; // Whether the entity can randomly spawn
	imageId: string;
}
