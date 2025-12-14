// src/server/main.server.ts
import { playerService } from "server/services/PlayerService";
import { datastoreService } from "server/services/DatastoreService"
import { networkService } from "server/services/NetworkService"
import { Players } from "@rbxts/services";

Players.PlayerAdded.Connect((player: Player) => {
    playerService.printName(player);
    datastoreService.load(player);
});

Players.PlayerRemoving.Connect((player: Player) => {
    datastoreService.save(player);
})

networkService.newRemote("Test", 1);
networkService.newRemote("Test", 1);
networkService.newRemote("Test2", 1);
