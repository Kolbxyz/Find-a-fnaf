// src/shared/network.ts
import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
    ping(message: string): void;
    ping2(): void;
}

interface ServerToClientEvents {
    pong(message: string): void;
}

interface ClientToServerFunctions {
    getServerTime(): number;
}

interface ServerToClientFunctions { }

export const GlobalEvents =
    Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions =
    Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
