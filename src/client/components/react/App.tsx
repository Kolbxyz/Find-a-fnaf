import React, { useState, useEffect } from "@rbxts/react";

import { Inventory } from "./Inventory";
import { HUD } from "./HUD";
import { MainMenu } from "./MainMenu";
import { Players } from "@rbxts/services";
import { Counter } from "./Counter";
import { Popup } from "./Popup";
import { ClientEvents } from "client/network";

export function App() {
	const [screen, setScreen] = useState<"menu" | "inventory">("menu");
	const [coins, setCoins] = useState<number>(0);
	const [currentPopup, setPopup] = useState<string | undefined>();
	const items = ["Sword", "Shield", "Potion"];

	useEffect(() => {
		const connection = Players.LocalPlayer.Chatted.Connect(() => {
			setCoins((prev) => prev + 10);
		});
		const connection2 = ClientEvents.newEntity.connect((entityName: string) => {
			print(entityName);
			setPopup(entityName);
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
				<Counter initialCount={0} />
				{currentPopup !== undefined && <Popup entityName={currentPopup}></Popup>}
			</screengui>
			{screen === "menu" && <MainMenu onStart={() => setScreen("inventory")} />}
			{screen === "inventory" && <Inventory items={items} onBack={() => setScreen("menu")} />}
		</>
	);
}
