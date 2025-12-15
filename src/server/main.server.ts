// src/server/main.server.ts
import { playerService } from "server/services/PlayerService";
import { datastoreService } from "server/services/DatastoreService"
import { networkService, RemoteInstance } from "shared/services/NetworkService"
import { Players } from "@rbxts/services";

Players.PlayerAdded.Connect((player: Player) => {
    playerService.printName(player);
    datastoreService.load(player);
});

Players.PlayerRemoving.Connect((player: Player) => {
    datastoreService.save(player);
})

const remote: RemoteInstance = networkService.newRemote("Category/Test", 1);
const remote2: RemoteInstance = networkService.newRemote("Category/Test", 1);
const remote3: RemoteInstance = networkService.newRemote("Category/Test2", 1);

remote.bind(() => { print("hi") });
(remote.object as RemoteEvent).FireServer("hi");
