import { Controller, OnStart } from "@flamework/core";
import React from "@rbxts/react";
import { Players } from "@rbxts/services";
import { createRoot, createPortal } from "@rbxts/react-roblox";
import { App } from "client/components/react/App";
import { VerboseService } from "shared/Utils/VerboseService";

@Controller()
export class UIController implements OnStart {
	constructor(private VerboseService: VerboseService) {}
	private root = createRoot(new Instance("Folder"));

	onStart() {
		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

		this.VerboseService.print("Initialized UIController");
		this.root.render(createPortal(<App />, playerGui));
	}

	onDestroy() {
		this.root.unmount();
	}
}
