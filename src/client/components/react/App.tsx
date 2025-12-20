import React, { useState, useEffect } from "@rbxts/react";

import { MainMenu } from "./MainMenu";
import { Popup } from "./Popup";
import { ClientEvents } from "client/network";
import { Entity } from "shared/types/Entities";
import { Button } from "./Button";
import { Label } from "./Tooltip";

export function App() {
	const [screen, setScreen] = useState<"someshi" | "settings" | "shop" | "none">("none");
	const [currentPopup, setPopup] = useState<Entity | undefined>();

	useEffect(() => {
		const connection2 = ClientEvents.newEntity.connect((entity: Entity) => {
			print(entity.name);
			setPopup(entity);
			task.delay(5, () => {
				setPopup(undefined);
			});
		});
		return () => {
			connection2.Disconnect();
		}; // onDestroy() function
	}, []);

	return (
		<>
			{/* Always visible HUD */}
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 10)}
			/>

			<Button
				iconId="114505581952233"
				label="Shop"
				color={new Color3(1, 0, 0)}
				onClick={() => setScreen("shop")}
			/>
			<Button
				iconId="9405930424"
				label="Someshi"
				color={new Color3(0.57, 1, 0)}
				onClick={() => setScreen("someshi")}
			/>
			<Button
				iconId="17824369869"
				label="Settings"
				color={new Color3(0, 0.5, 1)}
				onClick={() => setScreen("settings")}
			/>

			{/* Conditional screens */}
			{currentPopup !== undefined && <Popup entity={currentPopup}></Popup>}
			{/*screen === "settings" && <Counter initialCount={1} />*/}
			{/*screen === "shop" && <Counter initialCount={777} />*/}
			{screen === "none" && <MainMenu onStart={() => setScreen("none")} />}
			<Label txt={screen} />
		</>
	);
}
