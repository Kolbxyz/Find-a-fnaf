import React from "@rbxts/react";
import { Entity, Rarity, RarityColor } from "shared/types/Entities";

export function Popup({ entity }: { entity: Entity }) {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} Transparency={1}>
			<textlabel
				Text="You found !"
				TextScaled={true}
				Size={new UDim2(0.8, 0, 0.15, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.2, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Font={Enum.Font.Bangers}
				TextColor3={new Color3(1, 1, 1)}
			>
				<uistroke Thickness={2} Color={new Color3()} />
			</textlabel>
			<imagelabel
				Size={new UDim2(0.8, 0, 0.4, 0)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Image={`rbxassetid://${entity.imageId}`}
				Transparency={1}
			>
				<uiaspectratioconstraint />
			</imagelabel>
			<textlabel
				Text={entity.name}
				TextScaled={true}
				Size={new UDim2(0.8, 0, 0.1, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.8, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Font={Enum.Font.Bangers}
				TextColor3={new Color3(1, 1, 1)}
			>
				<uistroke Thickness={2} Color={new Color3()} />
			</textlabel>
			<textlabel
				Text={Rarity[entity.rarity]}
				TextScaled={true}
				Size={new UDim2(0.8, 0, 0.05, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.9, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Font={Enum.Font.Bangers}
				TextColor3={RarityColor[entity.rarity - 1]}
			>
				<uistroke Thickness={2} Color={new Color3()} />
			</textlabel>
		</frame>
	);
}
