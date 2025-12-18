import React from "@rbxts/react";

interface MainMenuProps {
	onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
	return (
		<frame Size={UDim2.fromScale(0.3, 0.3)} Position={UDim2.fromScale(0.35, 0.35)} Transparency={1}>
			<textbutton
				Size={UDim2.fromScale(1, 1)}
				Text="Start Game"
				Event={{ Activated: onStart }}
				Font={Enum.Font.Cartoon}
				TextScaled={true}
				BackgroundColor3={new Color3(0.08, 0.11, 0.16)}
				TextColor3={new Color3(1, 1, 1)}
			>
				<uicorner CornerRadius={new UDim(0, 12)}></uicorner>
			</textbutton>
		</frame>
	);
}
