import React from "@rbxts/react";

export function Popup({ entityName, imageId }: { entityName: string; imageId: string }) {
	return (
		<frame>
			<imagelabel
				Size={new UDim2(0.2, 0, 0.2, 0)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Image={`rbxassetid://${imageId}`}
			/>
			<textlabel
				Text={entityName}
				TextScaled={true}
				Size={new UDim2(0.2, 0, 0.2, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.8, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
			/>
		</frame>
	);
}
