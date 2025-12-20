import React from "@rbxts/react";

interface LabelProps {
	txt: string | unknown;
	position?: UDim2;
	anchorPoint?: Vector2;
	size?: UDim2;
	color?: Color3;
}

export function Label({ txt, position, anchorPoint, size, color }: LabelProps) {
	return (
		<textlabel
			Font={Enum.Font.Cartoon}
			Text={typeIs(txt, "string") ? txt : "[error!]"}
			TextScaled={true}
			Size={size ?? new UDim2(1, 0, 0.1, 0)}
			BackgroundTransparency={1}
			TextColor3={color ?? new Color3(1, 1, 1)}
			Position={position ?? new UDim2()}
			AnchorPoint={anchorPoint ?? new Vector2()}
			RichText={true}
		>
			<uistroke Color={new Color3(0, 0, 0)} />
		</textlabel>
	);
}
