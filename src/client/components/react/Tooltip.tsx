import React from "@rbxts/react";

export function Label({ txt }: { txt: string | unknown }) {
	return (
		<textlabel
			Font={Enum.Font.Bangers}
			Text={typeIs(txt, "string") ? txt : "i dunno"}
			TextScaled={true}
			Size={new UDim2(1, 0, 0.1, 0)}
			BackgroundTransparency={1}
			TextColor3={new Color3(1, 1, 1)}
		>
			<uistroke Color={new Color3(0, 0, 0)} />
		</textlabel>
	);
}
