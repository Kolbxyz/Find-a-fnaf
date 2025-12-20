import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { Popup } from "client/components/react/Popup";
import { Entity, Rarity } from "shared/types/Entities";

function story(target: Frame) {
	const root = createRoot(target);

	const test_entity: Entity = {
		name: "quelque chose.",
		id: "just a test",
		description: "no desc",
		rarity: Rarity.Mythic,
		prob: [10, 100],
		canSpawn: false,
		imageId: "6672218421",
	};
	root.render(<Popup entity={test_entity} />);

	return () => {
		root.unmount();
	};
}

export = story;
