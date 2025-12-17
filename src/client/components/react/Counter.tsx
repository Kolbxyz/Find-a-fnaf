import React, { useState } from "@rbxts/react";

export function Counter({ initialCount }: { initialCount: number }) {
	const [count, setCount] = useState(initialCount);

	return (
		<textbutton
			Font={Enum.Font.Cartoon}
			Text={`Count: ${count}`}
			Size={new UDim2(0, 100, 0, 50)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Event={{ Activated: () => setCount(count + 1) }}
		/>
	);
}
