import React from "@rbxts/react";

interface LabelProps {
	text: string | unknown;
	position?: UDim2;
	anchorPoint?: Vector2;
	size?: UDim2;
	color?: Color3;
	transparency?: number;
	children?: React.ReactNode;
	stroke?: boolean;
}

export function Label({ text, position, anchorPoint, size, color, transparency, children, stroke }: LabelProps) {
	return (
		<textlabel
			Font={Enum.Font.Cartoon}
			Text={typeIs(text, "string") ? text : "[error!]"}
			TextScaled={true}
			Size={size ?? new UDim2(1, 0, 0.1, 0)}
			BackgroundTransparency={transparency ?? 1}
			TextColor3={color ?? new Color3(1, 1, 1)}
			Position={position ?? new UDim2()}
			AnchorPoint={anchorPoint ?? new Vector2()}
			RichText={true}
			BackgroundColor3={new Color3(0.03, 0.03, 0.4)}
		>
			<uistroke Color={new Color3(0, 0, 0)} Thickness={stroke ? 3 : 2} />
			{children}
		</textlabel>
	);
}
