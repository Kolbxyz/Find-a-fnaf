import React, { useState } from "@rbxts/react";

export function Inventory({ items, onBack }: { items: string[]; onBack: () => void }) {
    return (
        <screengui ResetOnSpawn={false}>
            <frame Size={UDim2.fromScale(0.5, 0.5)} Position={UDim2.fromScale(0.25, 0.25)}>
                <uilistlayout FillDirection="Vertical" Padding={new UDim(0, 5)} />
                {items.map((item, i) => (
                    <textlabel
                        Text={item}
                        LayoutOrder={i + 1}
                        Size={UDim2.fromScale(1, 0.1)}
                    />
                ))}

                <textbutton Text="Back" Size={UDim2.fromScale(1, 0.1)} Event={{ Activated: onBack }} />
            </frame>
        </screengui>
    );
}
