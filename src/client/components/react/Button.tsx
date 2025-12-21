import React, { useEffect, useRef } from "@rbxts/react";
import { animateButton } from "client/Modules/UI";

interface ButtonProps {
	iconId: string;
	label: string;
	color: Color3;
	onClick?: () => void;
}

export function Button({ iconId, label, color, onClick }: ButtonProps) {
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
			Size={new UDim2(1, 0, 0.3, 0)}
			Transparency={0.75}
			BackgroundColor3={new Color3(0.05, 0, 0.73)}
			Event={{ MouseButton1Click: onClick }}
		>
			<uistroke Thickness={2} ApplyStrokeMode={Enum.ApplyStrokeMode.Border} />
			<uiaspectratioconstraint />
			<imagelabel
				Image={`rbxassetid://${iconId}`}
				Size={new UDim2(0.8, 0, 0.65, 0)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
			>
				<uiaspectratioconstraint />
			</imagelabel>
			<textlabel
				Font={Enum.Font.Cartoon}
				Position={new UDim2(0.5, 0, 1, 0)}
				AnchorPoint={new Vector2(0.5, 1)}
				RichText={true}
				Text={"<b>" + label + "</b>"}
				TextColor3={color}
				BackgroundTransparency={1}
				TextScaled={true}
				Size={new UDim2(1, 0, 0.25, 0)}
			>
				<uigradient
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, color.Lerp(Color3.fromRGB(255, 255, 255), 0.25)),
							new ColorSequenceKeypoint(0.5, color),
							new ColorSequenceKeypoint(1, color.Lerp(Color3.fromRGB(0, 0, 0), 0.35)),
						])
					}
					Rotation={90}
				/>
				<uistroke Thickness={2} />
			</textlabel>
		</textbutton>
	);
}
