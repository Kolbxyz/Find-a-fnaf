// server/runtime.server.ts
import { Flamework } from "@flamework/core";
import { ServerEvents } from "./network";

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/server/components");
Flamework.addPaths("src/shared/components");

Flamework.ignite();

print("Server events initialized:", ServerEvents);
