import { Controller } from "@flamework/core";
import React from "@rbxts/react";
import { Players } from "@rbxts/services";
import { createRoot, createPortal } from "@rbxts/react-roblox";
import { App } from "client/components/App";

@Controller({})
export class UIController {
	private root = createRoot(new Instance("Folder"));

	onStart() {
		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

		this.root.render(createPortal(<App />, playerGui));
	}

	onDestroy() {
		this.root.unmount();
	}
}
