// shared/network.ts
import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	event(param1: string): void;
}

interface ServerToClientEvents {
	event(param1: string): void;
	givePlayerMoney(amount: number): void;
}

interface ClientToServerFunctions {
	function(param1: string): number;
}

interface ServerToClientFunctions {
	function(param1: string): number;
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
