import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { Button } from "client/components/react/Button";

function story(target: Frame) {
	const root = createRoot(target);

	root.render(
		<frame Size={new UDim2(0.1, 0, 1, 0)} BackgroundTransparency={1} Position={new UDim2(0.01, 0, 0, 0)}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 10)}
			/>

			<Button iconId="114505581952233" label="Shop" color={new Color3(1, 0, 0)} />
			<Button iconId="9405930424" label="Someshi" color={new Color3(0.57, 1, 0)} />
			<Button iconId="17824369869" label="Settings" color={new Color3(0, 0.5, 1)} />
		</frame>,
	);

	return () => {
		root.unmount();
	};
}

export = story;
