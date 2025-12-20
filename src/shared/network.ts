// shared/network.ts
import { Networking } from "@flamework/networking";
import { Entity } from "./types/Entities";

interface ClientToServerEvents {
	event(param1: string): void;
}

interface ServerToClientEvents {
	newEntity(entity: Entity): void;
	givePlayerMoney(amount: number): void;
}

interface ClientToServerFunctions {
	getCollection(): string[];
}

interface ServerToClientFunctions {
	getCollection(): string[];
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
