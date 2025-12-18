import { Flamework } from "@flamework/core";
import { ClientEvents } from "./network";

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/shared/Utils");

Flamework.ignite();
print("Server events initialized:", ClientEvents);
