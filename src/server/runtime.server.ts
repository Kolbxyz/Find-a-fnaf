// src/server/runtime.server.ts
import { Players } from "@rbxts/services";
import { playerService } from "server/services/PlayerService";
import { datastoreService } from "server/services/DatastoreService";

Players.PlayerAdded.Connect((player) => {
    playerService.printName(player);
    datastoreService.load(player);
});

Players.PlayerRemoving.Connect((player) => {
    datastoreService.save(player);
});
