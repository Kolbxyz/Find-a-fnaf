import React from "@rbxts/react";

interface CloseButtonProps {
	onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
	return (
		<textbutton
			Text={""}
			Font={Enum.Font.Cartoon}
			TextColor3={new Color3(1, 1, 1)}
			TextScaled={true}
			BackgroundColor3={new Color3(1, 1, 1)}
			Event={{ MouseButton1Click: onClick }}
			AnchorPoint={new Vector2(1, 0.5)}
			Position={new UDim2(0.995, 0, 0.5, 0)}
			Size={new UDim2(0.1, 0, 0.85, 0)}
		>
			<uigradient
				Color={
					new ColorSequence([
						new ColorSequenceKeypoint(0, new Color3(1, 0, 0.67).Lerp(Color3.fromRGB(255, 255, 255), 0.25)),
						new ColorSequenceKeypoint(0.5, new Color3(1, 0, 0)),
						new ColorSequenceKeypoint(1, new Color3(1, 0, 0).Lerp(Color3.fromRGB(0, 0, 0), 0.35)),
					])
				}
				Rotation={90}
			/>
			<textlabel
				RichText={true}
				Text={"<b>X</b>"}
				TextScaled={true}
				TextColor3={new Color3(1, 1, 1)}
				Interactable={false}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
			>
				<uistroke Thickness={2} />
				<uistroke Thickness={2} ApplyStrokeMode={Enum.ApplyStrokeMode.Border} />
			</textlabel>
			<uiaspectratioconstraint />
		</textbutton>
	);
}
