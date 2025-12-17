import React, { useState } from "@rbxts/react";
import { Inventory } from "./Inventory";
import { HUD } from "./HUD";
import { MainMenu } from "./MainMenu";

export function App() {
    const [screen, setScreen] = useState<"menu" | "inventory">("menu");
    const items = ["Sword", "Shield", "Potion"];

    return (
        <>
            {/* Always visible HUD */}
            <HUD coins={100} />

            {/* Conditional screens */}
            {screen === "menu" && <MainMenu onStart={() => setScreen("inventory")} />}
            {screen === "inventory" && <Inventory items={items} onBack={() => setScreen("menu")} />}
        </>
    );
}
