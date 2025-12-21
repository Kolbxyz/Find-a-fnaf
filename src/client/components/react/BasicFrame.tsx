import React from "@rbxts/react";
import { CloseButton } from "./CloseButton";
import { Label } from "./Label";

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
			<uiaspectratioconstraint AspectRatio={0.9 / 0.5} />
			<Label
				text={title ?? "Default title"}
				size={new UDim2(1, 0, 0.1, 0)}
				color={new Color3(1, 1, 1)}
				transparency={0}
			>
				<CloseButton onClick={onClose} />
				<uistroke Thickness={2} />
				<uistroke Thickness={2} />
			</Label>
			{children}
		</frame>
	);
}
