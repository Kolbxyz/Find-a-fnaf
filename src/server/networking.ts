// server/networking.ts
import { GlobalEvents, GlobalFunctions } from "shared/networking";
import { Players } from "@rbxts/services";

export const Events = GlobalEvents.createServer({});
export const Functions = GlobalFunctions.createServer({});

Events.ping.connect((player: Player, msg: string) => {
    print(player.Name, "says:", msg);
});
