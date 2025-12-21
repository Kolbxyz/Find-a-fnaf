import React, { useEffect, useRef } from "@rbxts/react";
import { Label } from "./Label";
import { animateButton } from "client/Modules/UI";

interface CloseButtonProps {
	onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
	const ref = useRef<TextButton>();

	useEffect(() => {
		if (!ref || !ref.current) return;
		const originalSize = ref.current.Size;

		const animations = animateButton();
		const hoverConnection = ref.current.MouseEnter.Connect(() => {
			animations[0](ref.current as TextButton, originalSize);
		});
		const leaveConnection = ref.current.MouseLeave.Connect(() => {
			animations[1](ref.current as TextButton, originalSize);
		});

		return () => {
			hoverConnection.Disconnect();
			leaveConnection.Disconnect();
		};
	}, []);

	return (
		<textbutton
			ref={ref}
			Text={""}
			Font={Enum.Font.Cartoon}
			TextColor3={new Color3(1, 1, 1)}
			TextScaled={true}
			BackgroundColor3={new Color3(1, 1, 1)}
			Event={{ MouseButton1Click: onClick }}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={new UDim2(0.97, 0, 0.5, 0)}
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
			<Label text={"<b>X</b>"} color={new Color3(1, 1, 1)} size={new UDim2(1, 0, 1, 0)} transparency={1}>
				<uistroke Thickness={2} />
				<uistroke Thickness={2} ApplyStrokeMode={Enum.ApplyStrokeMode.Border} />
			</Label>
			<uiaspectratioconstraint />
		</textbutton>
	);
}
