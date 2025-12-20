import { unknown } from "@rbxts/bytenet";
import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { Frame } from "client/components/react/BasicFrame";

function story(target: Frame) {
	const root = createRoot(target);

	root.render(<Frame title="Shop" onClose={() => unknown} />);

	return () => {
		root.unmount();
	};
}

export = story;
