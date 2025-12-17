// server/modules/Entities.ts
import { Entity } from "shared/types/Entities";
import { entities } from "server/data/EntitiesData";

export function getRandom(): Entity {
	const randint = math.random(1, 10000) / 10000;

	entities.forEach((entity) => {
		const [min, max] = entity.prob;

		if (randint >= min && randint <= max) return entity;
	});
	return entities[0]; // Shouldn't be happening but, in case it does, return error entity
}
