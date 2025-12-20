import React, { useState } from "@rbxts/react";

export function Counter({ initialCount }: { initialCount: number }) {
	const [count, setCount] = useState(initialCount);

	return (
		<textbutton
			Font={Enum.Font.Cartoon}
			Text={`Count: ${count}`}
			BackgroundColor3={new Color3(0.02, 0.4, 0.73)}
			TextScaled={true}
			Size={new UDim2(0, 100, 0, 50)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Event={{ Activated: () => setCount(count + 1) }}
		>
			<uicorner CornerRadius={new UDim(0.1, 0)} />
			<uistroke Color={new Color3(0, 0, 1)} ApplyStrokeMode={Enum.ApplyStrokeMode.Border} />
		</textbutton>
	);
}
