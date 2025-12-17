import React from "@rbxts/react";

interface MainMenuProps {
    onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
    return (
        <screengui ResetOnSpawn={false}>
            <frame Size={UDim2.fromScale(0.3, 0.3)} Position={UDim2.fromScale(0.35, 0.35)}>
                <textbutton
                    Size={UDim2.fromScale(1, 1)}
                    Text="Start Game"
                    Event={{ Activated: onStart }}
                />
            </frame>
        </screengui>
    );
}
