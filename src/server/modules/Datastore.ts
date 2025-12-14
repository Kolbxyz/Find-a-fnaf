// src/server/modules/Datastore.ts
import { DataStoreService } from "@rbxts/services";
import { playerService } from "server/services/PlayerService";

const Datastore = DataStoreService.GetDataStore("players_data")

export function loadData(player: Player) {
    const [success, result] = pcall(() => {
        const data = Datastore.GetAsync(`${player.UserId}`) ?? 0;
        return data;
    });
    if (!success && result)
        warn(result);
    else {
        playerService.playerData.set(player, result);
        print("Succesfully loaded data!");
    }
}

export function saveData(player: Player) {
    const [s, e] = pcall(() => {

    });
}
