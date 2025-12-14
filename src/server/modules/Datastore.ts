// src/server/modules/Datastore.ts
import { DataStoreService } from "@rbxts/services";
import { playerService } from "server/services/PlayerService";

const Datastore = DataStoreService.GetDataStore("players_data")

export function loadData(player: Player): number {
    let playerData: number = 0;

    const [success, ret] = pcall(() => {
        const result = Datastore.GetAsync(`${player.UserId}`) ?? 0;
        playerData = result[0] as number;
    });

    if (!success) {
        warn(`Failed to load data for ${player.Name}: ${ret}`);
        return 0;
    }

    playerService.playerData.set(player, playerData);
    print(`Successfully loaded data for ${player.Name}`);
    return playerData;
}

export function saveData(player: Player): boolean {
    const playerData = playerService.playerData.get(player);

    if (playerData === undefined) {
        warn(`No data to save for ${player.Name}`);
        return false;
    }

    const [success, errorMsg] = pcall(() => {
        Datastore.SetAsync(`${player.UserId}`, playerData);
    });

    if (!success) {
        warn(`Failed to save data for ${player.Name}: ${errorMsg}`);
        return false;
    }
    playerService.playerData.delete(player);
    print(`Successfully saved data for ${player.Name}`);
    return true;
}
