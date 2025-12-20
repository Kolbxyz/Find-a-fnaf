import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { Popup } from "client/components/react/Popup";

function story(target: Frame) {
	const root = createRoot(target);

	root.render(<Popup entityName="Nikolas" imageId="6672218421" />);

	return () => {
		root.unmount();
	};
}

export = story;
