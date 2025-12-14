// src/server/main.server.ts
import { playerService } from "server/services/PlayerService";
import { datastoreService } from "server/services/DatastoreService"
import { Players } from "@rbxts/services";

Players.PlayerAdded.Connect((player: Player) => {
    playerService.printName(player);
    datastoreService.load(player);
});

Players.PlayerRemoving.Connect((player: Player) => {
    datastoreService.save(player);
})
