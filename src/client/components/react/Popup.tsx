import React from "@rbxts/react";

export function Popup({ entityName, imageId }: { entityName: string; imageId: string }) {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} Transparency={1}>
			<imagelabel
				Size={new UDim2(0.2, 0, 0.2, 0)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Image={`rbxassetid://${imageId}`}
			/>
			<textlabel
				Text={entityName}
				TextScaled={true}
				Size={new UDim2(0.5, 0, 0.2, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.8, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Font={Enum.Font.Bangers}
				TextColor3={new Color3(1, 1, 1)}
			>
				<uistroke Thickness={2} Color={new Color3()} />
			</textlabel>
		</frame>
	);
}
