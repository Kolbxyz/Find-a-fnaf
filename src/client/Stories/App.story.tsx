import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { App } from "client/components/react/App";

function story(target: Frame) {
	const root = createRoot(target);

	root.render(
		<>
			<App />
		</>,
	);

	return () => {
		root.unmount();
	};
}

export = story;
