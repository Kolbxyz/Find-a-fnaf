// server/network.ts
import { GlobalEvents, GlobalFunctions } from "shared/network";

export const ServerFunctions = GlobalFunctions.createServer({});
export const ServerEvents = GlobalEvents.createServer({});

ServerEvents.event.connect((player: Player, msg: string) => {
	print(msg);
});
