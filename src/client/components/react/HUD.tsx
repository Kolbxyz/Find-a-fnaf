import React from "@rbxts/react";

interface HUDProps {
	coins: number;
}

export function HUD({ coins }: HUDProps) {
	return (
		<frame
			Size={UDim2.fromOffset(200, 50)}
			Position={UDim2.fromScale(0, 0)}
			BackgroundColor3={Color3.fromRGB(30, 30, 30)}
			Transparency={0.5}
		>
			<textlabel
				Size={UDim2.fromScale(1, 1)}
				Text={`Coins: ${coins}`}
				TextColor3={Color3.fromRGB(255, 255, 0)}
				TextScaled
				BackgroundTransparency={1}
			/>
		</frame>
	);
}
