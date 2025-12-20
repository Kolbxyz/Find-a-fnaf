import React from "@rbxts/react";
import { entities } from "shared/data/EntitiesData";
import { Entity, Rarity, RarityColor } from "shared/types/Entities";
import { Label } from "./Label";

export function Index({ collection }: { collection: string[] }) {
	return (
		<>
			<frame
				Size={new UDim2(0.45, 0, 0.9, 0)}
				Position={new UDim2(0.65, 0, 1, 0)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={0.5}
				ClipsDescendants={false}
			/>
			<scrollingframe
				AutomaticCanvasSize={"XY"}
				CanvasSize={new UDim2(0, 0, 0, 0)}
				Size={new UDim2(0.65, 0, 0.9, 0)}
				Position={new UDim2(0.02, 0, 1, 0)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={1}
				ClipsDescendants={false}
			>
				<uigridlayout CellSize={new UDim2(0.22, 0, 0.3, 0)} CellPadding={new UDim2(0, 10, 0, 10)} />
				{entities.map((entity: Entity, i) => (
					<imagebutton
						LayoutOrder={i + 1}
						Image={`rbxassetid://${entity.imageId}`}
						BackgroundTransparency={0.3}
						BackgroundColor3={new Color3(0.15, 0.15, 0.22)}
						ImageColor3={collection.includes(entity.id) ? new Color3(1, 1, 1) : new Color3(0, 0, 0)}
					>
						<uiaspectratioconstraint />
						<uistroke Thickness={2} />
						<Label
							txt={"<b>" + Rarity[entity.rarity] + "</b>"}
							color={RarityColor[entity.rarity - 1]}
							position={new UDim2(0.5, 0, 1, 0)}
							anchorPoint={new Vector2(0.5, 1)}
							size={new UDim2(1, 0, 0.2, 0)}
						></Label>
					</imagebutton>
				))}
			</scrollingframe>
		</>
	);
}
