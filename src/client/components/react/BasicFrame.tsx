import React from "@rbxts/react";
import { CloseButton } from "./CloseButton";

interface FrameProps {
	title: string;
	onClose: () => void;
	children?: React.ReactNode;
}

export function Frame({ title, onClose, children }: FrameProps) {
	return (
		<frame
			Transparency={0.75}
			BackgroundColor3={new Color3(0.05, 0, 0.73)}
			Size={new UDim2(0.6, 0, 0.65, 0)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			ClipsDescendants={true}
		>
			<uiaspectratioconstraint AspectRatio={0.7 / 0.6} />
			<textlabel
				Text={title ?? "Default title"}
				Size={new UDim2(1, 0, 0.1, 0)}
				TextScaled={true}
				Font={Enum.Font.Cartoon}
				TextColor3={new Color3(1, 1, 1)}
				BackgroundColor3={new Color3(0.2, 0.2, 0.45)}
			>
				<CloseButton onClick={onClose} />
				<uistroke Thickness={2} />
			</textlabel>
			<uistroke Thickness={2} />

			{children}
		</frame>
	);
}
