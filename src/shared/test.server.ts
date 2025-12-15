// src/shared/networking.ts
import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
    ping(message: string): void;
}

interface ServerToClientEvents {
    pong(message: string): void;
}

export const GlobalEvents =
    Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
