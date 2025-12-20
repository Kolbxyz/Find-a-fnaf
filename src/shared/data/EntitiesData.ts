import { Entity, Rarity } from "shared/types/Entities";

export const entities: Entity[] = [
	{
		id: "error",
		name: "Internal error",
		description: "You shouldn't be getting this..?",
		rarity: Rarity.Legendary,
		prob: [0, 0],
		canSpawn: false,
		imageId: "",
	},
	{
		id: "test",
		name: "test name",
		description: "just a test entity",
		rarity: Rarity.Rare,
		prob: [0, 5000],
		canSpawn: true,
		imageId: "12441846851",
	},
];
