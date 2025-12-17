import React, { useState, useEffect } from "@rbxts/react";

import { Inventory } from "./Inventory";
import { HUD } from "./HUD";
import { MainMenu } from "./MainMenu";
import { Players } from "@rbxts/services";
import { Counter } from "./Counter";

export function App() {
	const [screen, setScreen] = useState<"menu" | "inventory">("menu");
	const [coins, setCoins] = useState<number>(0);
	const items = ["Sword", "Shield", "Potion"];

	useEffect(() => {
		const connection = Players.LocalPlayer.Chatted.Connect(() => {
			setCoins((prev) => prev + 10);
		});

		return () => connection.Disconnect(); // onDestroy() function
	}, []);

	return (
		<>
			{/* Always visible HUD */}
			<HUD coins={coins} />

			{/* Conditional screens */}
			<screengui ResetOnSpawn={false}>
				<Counter initialCount={0} />
			</screengui>
			{screen === "menu" && <MainMenu onStart={() => setScreen("inventory")} />}
			{screen === "inventory" && <Inventory items={items} onBack={() => setScreen("menu")} />}
		</>
	);
}
