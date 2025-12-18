import React, { useState, useEffect } from "@rbxts/react";

import { Inventory } from "./Inventory";
import { HUD } from "./HUD";
import { MainMenu } from "./MainMenu";
import { Players } from "@rbxts/services";
import { Popup } from "./Popup";
import { ClientEvents } from "client/network";

export function App() {
	const [screen, setScreen] = useState<"menu" | "inventory">("menu");
	const [coins, setCoins] = useState<number>(0);
	const [currentPopup, setPopup] = useState<{ name: string; image: string } | undefined>();
	const items = ["Sword", "Shield", "Potion"];

	useEffect(() => {
		const connection = Players.LocalPlayer.Chatted.Connect(() => {
			setCoins((prev) => prev + 10);
		});
		const connection2 = ClientEvents.newEntity.connect((entityName: string, imageId: string) => {
			print(entityName);
			setPopup({ name: entityName, image: imageId });
			task.delay(5, () => {
				setPopup(undefined);
			});
		});
		return () => {
			connection.Disconnect();
			connection2.Disconnect();
		}; // onDestroy() function
	}, []);

	return (
		<>
			{/* Always visible HUD */}
			<HUD coins={coins} />

			{/* Conditional screens */}
			<screengui ResetOnSpawn={false}>
				{currentPopup !== undefined && (
					<Popup entityName={currentPopup.name} imageId={currentPopup.image}></Popup>
				)}
				{screen === "menu" && <MainMenu onStart={() => setScreen("inventory")} />}
				{screen === "inventory" && <Inventory items={items} onBack={() => setScreen("menu")} />}
			</screengui>
		</>
	);
}
