import React, { useState, useEffect } from "@rbxts/react";

import { Popup } from "./Popup";
import { ClientEvents, ClientFunctions } from "client/network";
import { Entity } from "shared/types/Entities";
import { Button } from "./Button";
import { Label } from "./Label";
import { Frame } from "./BasicFrame";
import { Shop } from "./Shop";
import { Index } from "./Index";
import { Players } from "@rbxts/services";

export function App() {
	const [screen, setScreen] = useState<"index" | "shop" | "none">("none");
	const [currentPopup, setPopup] = useState<Entity | undefined>();
	const [collection, setCollection] = useState<string[]>([]);

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
			<frame
				Size={new UDim2(0.1, 0, 1, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.01, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0, 0.5)}
			>
				<uiaspectratioconstraint AspectRatio={0.1} />
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
					onClick={() => setScreen(screen !== "shop" ? "shop" : "none")}
				/>
				<Button
					iconId="127110909372919"
					label="Index"
					color={new Color3(0.57, 1, 0)}
					onClick={() => {
						setScreen(screen !== "index" ? "index" : "none");
						if (screen !== "index") {
							ClientFunctions.getCollection
								.invoke()
								.then((result: string[]) => {
									setCollection(result);
								})
								.catch((err) => {
									warn("Failed to fetch collection:", err);
								});
						}
					}}
				/>
				<Button
					iconId="9562514785"
					label="spawn"
					color={new Color3(0, 0.5, 1)}
					onClick={() => {
						const hrp = Players.LocalPlayer.Character?.WaitForChild("HumanoidRootPart") as BasePart;
						if (hrp) {
							hrp.CFrame = new CFrame(0, 100, 0);
						}
					}}
				/>
			</frame>

			{/* Conditional screens */}
			{currentPopup !== undefined && <Popup entity={currentPopup}></Popup>}
			{/*screen === "spawn" && <Counter initialCount={1} />*/}
			{screen === "shop" && (
				<Frame title={"Shop"} onClose={() => setScreen("none")}>
					<Shop />
				</Frame>
			)}
			{screen === "index" && (
				<Frame title={"Index"} onClose={() => setScreen("none")}>
					<Index collection={collection} />
				</Frame>
			)}
			<Label txt={screen} />
		</>
	);
}
